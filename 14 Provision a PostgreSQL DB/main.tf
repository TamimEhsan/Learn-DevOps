terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

data "http" "myip" {
  url = "https://api.ipify.org?format=text"
}

resource "azurerm_resource_group" "example" {
  name     = "tamimer-resource-group"
  location = "Southeast Asia"
}

resource "azurerm_postgresql_server" "example" {
  name                         = "tamimer-postgresql-server"
  location                     = azurerm_resource_group.example.location
  resource_group_name          = azurerm_resource_group.example.name
  sku_name                     = "B_Gen5_1"
  storage_mb                   = 5120
  version                      = "11"
  administrator_login          = "tamimeradmin"
  administrator_login_password = "P@ssw0rd1234"
  ssl_enforcement_enabled      = false
  ssl_minimal_tls_version_enforced = "TLSEnforcementDisabled"

}

resource "azurerm_postgresql_database" "example" {
  name                = "tamimer-postgresql-db"
  resource_group_name = azurerm_resource_group.example.name
  server_name         = azurerm_postgresql_server.example.name
  charset             = "UTF8"
  collation           = "English_United States.1252"

  
}

resource "azurerm_postgresql_firewall_rule" "example" {
  name                = "allow_access"
  resource_group_name = azurerm_resource_group.example.name
  server_name         = azurerm_postgresql_server.example.name
  start_ip_address    = data.http.myip.response_body
  end_ip_address      = data.http.myip.response_body
}

resource "null_resource" "db_init" {
  depends_on = [azurerm_postgresql_database.example,azurerm_postgresql_firewall_rule.example]

  provisioner "local-exec" {
    command = "PGPASSWORD=${azurerm_postgresql_server.example.administrator_login_password} psql -h ${azurerm_postgresql_server.example.fqdn} -U ${azurerm_postgresql_server.example.administrator_login}@${azurerm_postgresql_server.example.fqdn} -d ${azurerm_postgresql_database.example.name} -a -f init.sql"
  }

}

output psql_connect {
  value       = "PGPASSWORD=${azurerm_postgresql_server.example.administrator_login_password} psql -h ${azurerm_postgresql_server.example.fqdn} -U ${azurerm_postgresql_server.example.administrator_login}@${azurerm_postgresql_server.example.fqdn} -d ${azurerm_postgresql_database.example.name}"
  sensitive   = true
  description = "Connect to the PostgreSQL database"
  depends_on  = [azurerm_postgresql_database.example]
}



# GPASSWORD=P@ssw0rd1234 psql -h tamimer-postgresql-server.postgres.database.azure.com 
// -U tamimeradmin@tamimer-postgresql-server.postgres.database.azure.com -d tamimer-postgresql-db -a -f init.sql
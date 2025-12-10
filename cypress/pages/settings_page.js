class settings_page {
    get_accounts() {
        return cy.xpath('//h3[normalize-space()="Account"])')
    }
    get_user_management() {
        return cy.xpath('//h3[normalize-space()="User Management"]')
    }
    get_integrations() {
        return cy.xpath('//h3[normalize-space()="Integrations"]')
    }
    get_nodeDetails() {
        return cy.xpath('//button[normalize-space()="Node Details"]')
    }
    get_node_list_container() {
        return cy.xpath('//div[@class="p-4 sm:p-6 flex flex-col gap-8"]');
    }
    get_base_threeDots() {
        return cy.xpath('(//*[name()="svg"][contains(@class,"h-5 w-5")])[16]')
    }
    get_bitcoin_threeDots() {
        return cy.xpath('(//*[name()="svg"][contains(@class,"h-5 w-5")])[17]')
    }
    get_ethereum_threeDots() {
        return cy.xpath('(//*[name()="svg"][contains(@class,"h-5 w-5")])[18]')
    }
    get_tron_threeDots() {
        return cy.xpath('(//*[name()="svg"][contains(@class,"h-5 w-5")])[19]')
    }
    get_test_connection() {
        return cy.xpath('//div[contains(text(),"Test Connection")]')
    }
    get_connection_success() {
        return cy.xpath('//p[contains(text(),"Connection successful!")]')
    }

    get_edit() {
        return cy.xpath('//div[normalize-space(text())="Edit"]')
    }
    get_input_url() {
        return cy.xpath('//input[@placeholder="Enter node server URL"]')
    }

    get_input_username() {
        return cy.xpath('//input[@placeholder="Enter node access username"]')
    }
    get_input_pswrd() {
        return cy.xpath('//input[@placeholder="Enter node access password"]')
    }
    get_save_details() {
        return cy.xpath('//button[contains(@class,"flex items-center")]')
    }
    get_server_key() {
        return cy.xpath('//input[@placeholder="Enter key to authenticate your node"]')
    }
    get_success_message_title() {
        return cy.contains('h3', 'Node details saved successfully!');
    }
    get_() {
        return cy.xpath('')
    }
    get_() {
        return cy.xpath('')
    }
    get_() {
        return cy.xpath('')
    }
    get_() {
        return cy.xpath('')
    }

}
export default settings_page;
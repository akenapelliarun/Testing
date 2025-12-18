class settings_account_page {
    get_account() {
        return cy.xpath('//h3[normalize-space(text())="Account"]')
    }
    get_testproject3() {
        return cy.xpath('//span[normalize-space(text())="Test Project 3"]')
    }
    get_projectName() {
        return cy.xpath("//input[@aria-describedby='projectName-description']")
    }
    get_websiteUrl() {
        return cy.xpath("//input[@aria-describedby='website-description']")
    }
    get_project_details_edit_save_btn() {
        return cy.xpath("(//button[contains(@class,'flex items-center')])[1]")
    }
    get_redirection_edit_save_btn() {
        return cy.xpath("(//button[contains(@class,'flex items-center')])[2]")
    }
    get_account_heading() {
        return cy.xpath("//h3[contains(text(), 'Account')]")
    }
    get_successUrl_label() {
        return cy.xpath("(//input[contains(@class,'flex-1 bg-transparent')])[3]")
    }
    get_cancelUrl_label() {
        return cy.xpath("//input[@aria-describedby='cancelEndpoint-description']")
    }
    get_branding() {
        return cy.xpath('(//nav[@aria-label="Tabs"]//button)[2]')
    }
    get_logo_edit() {
        return cy.xpath('(//button[@type="button"])[2]')
    }
    get_clear() {
        return cy.xpath('//span[normalize-space(text())="Clear"]')
    }
    get_logo_input() {
        return cy.xpath('//input[@id="upload-logo"]')
    }
    get_save_button() {
        return cy.xpath('//button[contains(.,"Save")]')
    }
    get_socialink_edit() {
        return cy.xpath('(//div[contains(@class,"px-6 py-4")]//button)[2]')
    } 
    get_twitter_handle() {
        return cy.xpath('//input[@id="twitter"]')
    }
    get_discord_link() {
        return cy.xpath('//input[@id="discord"]')
    }
    get_linkedIn_url() {
        return cy.xpath('//input[@id="linkedIn"]')
    }
    get_telegram_link() {
        return cy.xpath('//input[@id="telegram"]')
    }
    get_supportEmail() {
        return cy.xpath('//input[@id="supportEmail"]')
    }
    get_replyToEmail() {
        return cy.xpath('//input[@id="replyToEmail"]')
    }
    get_fromEmail() {
        return cy.xpath('//input[@id="fromEmail"]')
    }
    get_support_edit() {
        return cy.xpath('(//h3[@class="text-sm font-semibold"]/following-sibling::button)[3]')
    } 
    get_brand_colour() {
        return cy.xpath('//input[contains(@class,"flex-1 px-3")]')
    }
    get_colour_code() {
        // More flexible selector for the color preview swatch
        return cy.xpath('(//div[contains(@class,"w-8") and contains(@class,"h-8") and contains(@class,"rounded")])[2]')
    }

}
export default settings_account_page;
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
    get_() {
        return cy.xpath('')
    }
    get_() {
        return cy.xpath('')
    }
 

}
export default settings_account_page;
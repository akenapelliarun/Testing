class home_page {
    get_dashboard() {
        return cy.xpath("//ul//li//*[contains(text(),'Dashboard')]")
    }

    get_project_dropdown() {
        return cy.xpath("//div[@class='rounded-md border border-[#c9ff548d]']/button")
    }

    get_test_project_3() {
        return cy.xpath("//div[@class='rounded-md border border-[#c9ff548d]']/descendant::*[contains(text(),'Test Project 3')]")

    }
    get_payment_page() {
        return cy.xpath("//ul[@role='list']//descendant::*[contains(text(),'Payments')]")
    }
    get_settings() {
        return cy.xpath("//div[contains(text(), 'Settings')]")
    }
}
export default home_page;
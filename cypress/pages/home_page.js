class home_page {
    get_dashboard() {
        return cy.xpath("//ul//li//*[contains(text(),'Dashboard')]")
    }

    get_project_dropdown() {
        return cy.xpath("//div[@class='rounded-md border border-[#c9ff548d]']/button")
    }

    get_test_project_3() {
        return cy.xpath("//button[normalize-space()='Test Project 1']")
    }
    get_payment_page() {
        return cy.xpath("//ul[@role='list']//descendant::*[contains(text(),'Payments')]")
    }

    get_settings()
    {
        return cy.xpath("//body/div[@id='__next']/div[@class='relative']/div[@class='w-screen h-screen flex fixed top-0 left-0 overflow-hidden bg-skin-base']/div[1]")
    }
}
export default home_page;
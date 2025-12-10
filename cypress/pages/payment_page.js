class payment_page
{

get_payment_link()
{
    return cy.xpath("//ul[@role='list']//descendant::*[contains(text(),'Create Payment Link')]")
}
get_search_member_by_email()
{
    return cy.xpath("//div[@class='flex-1 p-6 space-y-6']/descendant::*[contains(text(),'Search member by email')]")
}
get_search_member_by_email_input()
{
    return cy.xpath('//div[@class="fixed bottom-0 z-[50] left-0 xs:left-0 h-fit xs:absolute xs:top-[60px] z-10 w-full min-w-[280px] bg-white border border-gray-300 rounded-t-2xl xs:rounded-lg mt-1 shadow-lg xs:max-h-2/3 overflow-y-auto"]//descendant::input')
}
get_add_new_member()
{
    return cy.xpath('//div[@class="fixed bottom-0 z-[50] left-0 xs:left-0 h-fit xs:absolute xs:top-[60px] z-10 w-full min-w-[280px] bg-white border border-gray-300 rounded-t-2xl xs:rounded-lg mt-1 shadow-lg xs:max-h-2/3 overflow-y-auto"]//descendant::*[contains(text(),"Add New Member")]')
}
get_email_input()
{
    return cy.xpath('//input[@id="email"]')
}
get_select_a_project()
{
    return cy.xpath('//div[@class="relative h-full w-full"]/descendant::*[contains(text(),"Select a project")]')
}
get_test_project_3()
{
    return cy.xpath('//div[@class="absolute overflow-y-auto w-full min-w-[220px] bg-white border border-gray-200 rounded-md shadow-sm z-[300]"]/descendant::*[contains(text(),"Test Project 1")]')
}
get_add_member_button()
{
    return cy.xpath('//button//descendant::*[contains(text(),"Add Member")]')
}
get_cancel_button()
{
    return cy.xpath('//button//descendant::*[contains(text(),"Cancel")]')
}
get_member_details_email()
{
    return cy.xpath('//*[contains(text(),"ankit@payram.com")]')
}
get_member_details_customer_id()
{
    return cy.xpath('//div[@class="flex flex-col space-y-3"]//descendant::*[@class="text-sm font-medium text-gray-700"]')
}
get_create_payment_link_button()
{
    return cy.xpath("//button[contains(., 'Create Payment Link') or contains(., 'Create Link')]")
}
get_create_payment_link_page_container()
{
    return cy.xpath("//div[@class='flex-1 p-6 space-y-6']")
}
get_search_result_member(email)
{
    // Search for member result that contains both email and project info - get first match
    return cy.xpath(`//div[contains(@class, 'overflow-y-auto')]//div[contains(., '${email}')]`).first()
}
get_generate_payment_link_button()
{
    return cy.xpath('//button//descendant::*[contains(text(),"Generate Payment Link")]')
}
get_amount_field()
{
    return cy.xpath('//div[@class="grid grid-cols-1 gap-6 sm:grid-cols-2"]//input[@type="text"]')
}
get_qr_code()
{
    return cy.xpath('//canvas[@role="img"]')
}
get_payment_link_popup()
{
    return cy.xpath('//div[contains(@class,"fixed") and contains(@class,"inset-0")]//div[contains(@class,"bg-white")]')
}
get_payment_link_url()
{
    return cy.xpath('//div[contains(@class,"flex") and contains(@class,"items-center")]//input[@readonly]')
}

}
export default payment_page;

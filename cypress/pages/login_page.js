class login_page
{

    get_email_field()
    {
        return cy.xpath("//input[@id='email']") 
    }
    get_password_field()
    {
        return cy.xpath("//input[@id='password']") 
    }
    get_login_button()  
    {
        return cy.xpath("//*[contains(text(),'Sign In')]/ancestor::button")
    }
}   
export default login_page;
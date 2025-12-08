class dashboard_page
{


    get_total_payments()  
    {
        return cy.xpath("//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(text(),'Total payments')]")
    }
     get_total_payments_value()  
    {
        return cy.xpath("(//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(@class,\"text-3xl flex\")])[1]") 
    }

     get_payments_in_last_30_days()  
    {
        return cy.xpath("//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(text(),'Payments in last 30 days')]")
    }
     get_payments_in_last_30_days_value()  
    {
        return cy.xpath("(//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(@class,\"text-3xl flex\")])[2]") 
    }

      get_total_paying_users()  
    {
        return cy.xpath("//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(text(),'Total paying users')]")
    }
     get_total_paying_users_value()  
    {
        return cy.xpath("(//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(@class,\"text-3xl flex\")])[3]") 
    }

     get_paying_users_in_last_30_days()  
    {
        return cy.xpath("//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(text(),'Paying Users in last 30 days')]")
    }
     get_paying_users_in_last_30_days_value()  
    {
        return cy.xpath("(//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(@class,\"text-3xl flex\")])[4]") 
    }

     get_total_users_requested_payments()  
    {
        return cy.xpath("//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(text(),'Total users requested payments')]")
    }
     get_total_users_requested_payments_value()  
    {
        return cy.xpath("(//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(@class,\"text-3xl flex\")])[5]") 
    }

     get_users_attempted_in_last_30_days()  
    {
        return cy.xpath("//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(text(),'User attempted in last 30 days')]")
    }
     get_users_attempted_in_last_30_days_value()  
    {
        return cy.xpath("(//div[@class=\"w-full flex flex-col \"]/descendant::*[contains(@class,\"text-3xl flex\")])[6]") 
    }
    // Network Dropdown Methods
    get_network_dropdown()
    {
        return cy.xpath('(//div[@class="flex flex-row-reverse justify-center items-center gap-2"]/descendant::*[contains(text(),"Network")])[1]') 
    }
    
    get_network_search_box()
    {
        return cy.xpath('//input[@type="text"]') 
    }

    get_currency_search_box()
    {
        return cy.xpath('//input[@type="text"]') 
    }
    
    get_select_none_button()
    {
        return cy.xpath('//*[contains(text(),"Select None")]') 
    }
    
    get_bitcoin_option()
    {
        return cy.xpath('//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]//img[@src="https://testnet.resuefas.vip:8443/images/icons/BTC.png"]') 
    }
    
    get_ethereum_option()
    {
        return cy.xpath('(//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]//img[@src="https://testnet.resuefas.vip:8443/images/icons/ETH.png"])[1]') 
    }
    
    get_tron_option()
    {
        return cy.xpath('//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]//img[@src="https://testnet.resuefas.vip:8443/images/icons/TRX.png"]') 
    }
    
    
    get_base_option()
    {
        return cy.xpath('//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]//img[@src="https://testnet.resuefas.vip:8443/images/icons/BASE.png"]') 
    }
    
    get_bitcoin_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/BTC.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    
    get_ethereum_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/ETH.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    
    get_tron_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/TRX.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    
   
    
    get_base_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/BASE.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    
    // Time Range Dropdown Methods
    get_time_range_dropdown()
    {
        return cy.xpath('//div[@class="relative "]//button') 
    }
    
    get_all_time_option()
    {
        return cy.xpath('//div[contains(@class,"px-6 py-3") and contains(text(),"All Time")]') 
    }
    
    // Graph Methods
    get_payment_in_usd_graph()
    {
        return cy.xpath('(//div[@class="w-full h-[416px] flex flex-col justify-start items-center pb-4"]//div[contains(text(),"Payments in USD")])[1]') 
    }
    
    get_bitcoin_data_payment_in_usd_graph()
    {
        return cy.xpath('(//*[@fill="#F7931A"])[1]') 
    }
    
    get_number_of_transactions_graph()
    {
        return cy.xpath('//div[contains(text(),"Number of Transactions")]') 
    }
    
    get_bitcoin_data_number_of_transactions_graph()
    {
        return cy.xpath('(//*[@fill="#F7931A"])[2]') 
    }

    get_ethereum_data_payment_in_usd_graph()
    {
        return cy.xpath('(//*[@fill="#627EEA"])[1]') 
    }
     get_ethereum_data_number_of_transactions_graph()
    {
        return cy.xpath('(//*[@fill="#627EEA"])[2]') 
    }

     get_tron_data_payment_in_usd_graph()
    {
        return cy.xpath('(//*[@fill="#C23631"])[1]') 
    }
     get_tron_data_number_of_transactions_graph()
    {
        return cy.xpath('(//*[@fill="#C23631"])[2]') 
    }
      get_base_data_payment_in_usd_graph()
    {
        return cy.xpath('(//*[@fill="#0052FF"])[1]') 
    }
     get_base_data_number_of_transactions_graph()
    {
        return cy.xpath('(//*[@fill="#0052FF"])[2]') 
    }

    get_currency_dropdown()     
    {
        return cy.xpath('(//div[@class="relative inline-flex h-fit items-center border-none border-gray-200 rounded-md overflow-visible"]//descendant::*[contains(text(),"Currency")])[1]') 
    }

    get_tether_option()
    {
        return cy.xpath('//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]/descendant::img[@src="https://testnet.resuefas.vip:8443/images/icons/USDT.png"]') 
    }
    get_USD_coin_option()
    {
        return cy.xpath('//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]/descendant::img[@src="https://testnet.resuefas.vip:8443/images/icons/USDC.png"]') 
    }
    get_CBBTC_option()
    {
        return cy.xpath('//div[@class="absolute top-5 right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-md z-50 shadow-md"]//img[@src="https://testnet.resuefas.vip:8443/images/icons/CBBTC.png""]') 
    }
    get_tether_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/USDT.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    get_USD_coin_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/USDC.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    get_CBBTC_checkmark()
    {
        return cy.xpath('//img[@src="https://testnet.resuefas.vip:8443/images/icons/CBBTC.png"]/ancestor::div[contains(@class,"flex")]//img[@alt="Check Icon"]') 
    }
    

}   
export default dashboard_page;
export interface MenuItemProp {
    id: string;
    parentId?: string;
    name: string;
    url: string;
    icon?: string;
    label: string;
    active?: boolean;
    isExternal?: boolean;
    children?: Array<MenuItemProp>;
}


const getMenuItems = (companyId: string, vendorCategories: any, salesCategories: any) => {

    let menuItems: Array<MenuItemProp> = [
        {
          name: 'CustomerCampaigns', url: ``, icon: 'mail2', label: 'Customer Campaigns', id: 'customercampaigns',
          children: [
            { name: 'Dashboard', url: `/dashboard/${companyId}`, icon: 'home', label: 'Dashboard', id: 'dashboard', parentId: 'customercampaigns' },
            { name: 'CreateACampaign', url: `/auto-emails/${companyId}/campaigns`, icon: 'mail2', label: 'Create a Campaign', id: 'create_a_campaign', parentId: 'customercampaigns' }
          ]
        },
        { name: 'Keywords Rank Tracker', url: "https://chrome.google.com/webstore/detail/komrsio-amazon-keyword-tr/hdlekegeaachepgfkadcjefobnmkjgdg", icon: 'graph',
            label: 'Keywords Rank Tracker', id: 'keyword_rank_tracker', isExternal: true },
        { name: 'Settings', url: `/settings/${companyId}`, icon: 'settings', label: 'Settings', id: 'settings' },
        // {
        //     name: 'ProductManagement', url: `/product-management/${companyId}`, icon: 'scan', label: 'Product Management', id: 'prodManagement',
        //     children: [
        //         { name: 'Dashboard', url: `/product-management/${companyId}/dashboard`, icon: 'apps', label: 'Dashboard', id: 'prodDs', parentId: 'prodManagement' },
        //         { name: 'Components', url: `/product-management/${companyId}/components`, icon: 'components', label: 'Components', id: 'prodComps', parentId: 'prodManagement' },
        //         { name: 'Products', url: `/product-management/${companyId}/products`, icon: 'products', label: 'Products', id: 'prodProds', parentId: 'prodManagement' }
        //     ]
        // }
      ];

    // const supplierChainVendors: Array<any> = [];
    //
    // for (const category of vendorCategories) {
    //     supplierChainVendors.push(
    //         { name: category['name'], url: `/supply-chain/${companyId}/vendors/${category['id']}`, icon: 'circle', label: category['name'], id: `supplyVendors-${category['name']}`, parentId: 'supplyVendors' },
    //     );
    // }
    //
    // menuItems.push(
    //     {
    //         name: 'SupplyChain', url: `/supply-chain/${companyId}`, icon: 'refresh', label: 'Supply Chain', id: 'supplyChain',
    //         children: [
    //             {
    //                 name: 'Vendors', url: `/supply-chain/${companyId}/vendors`, icon: 'shop', label: 'Vendors', id: 'supplyVendors', parentId: 'supplyChain',
    //                 children: supplierChainVendors
    //             },
    //             {
    //                 name: 'Orders', url: `/supply-chain/${companyId}/orders`, icon: 'shopping-cart', label: 'Orders', id: 'supplyChainOrders', parentId: 'supplyChain',
    //                 children: [
    //                     { name: 'PlanOrders', url: `/supply-chain/${companyId}/orders/plan`, icon: 'circle', label: 'Plan Orders', id: 'PlanOrders', parentId: 'supplyChainOrders' },
    //                     { name: 'ManageOrders', url: `/supply-chain/${companyId}/orders/manage`, icon: 'circle', label: 'Manage Orders', id: 'ManageOrders', parentId: 'supplyChainOrders' },
    //                     { name: 'ProductPlan', url: `/supply-chain/${companyId}/product-plan`, icon: 'circle', label: 'Product Plan', id: 'ProductPlan', parentId: 'supplyChainOrders' },
    //                 ]
    //             },
    //             {
    //                 name: 'Logistics', url: `/supply-chain/${companyId}/logistics`, icon: 'shipment', label: 'Logistics', id: 'supplyChainLogistics', parentId: 'supplyChain',
    //                 children: [
    //                     { name: 'Shipments', url: `/supply-chain/${companyId}/logistics/shipments`, icon: 'circle', label: 'Shipments', id: 'Shipments', parentId: 'supplyChainLogistics' },
    //                     { name: 'Transfers', url: `/supply-chain/${companyId}/logistics/transfers`, icon: 'circle', label: 'Transfers', id: 'Transfers', parentId: 'supplyChainLogistics' },
    //                 ]
    //             },
    //             {
    //                 name: 'Inventory', url: `/supply-chain/${companyId}/inventory`, icon: 'inventory', label: 'Inventory', id: 'supplyChainInventory', parentId: 'supplyChain',
    //                 children: [
    //                     { name: 'InventoryValuation', url: `/supply-chain/${companyId}/inventory/valuation`, icon: 'circle', label: 'Inventory Valuation', id: 'InventoryValuation', parentId: 'supplyChainInventory' },
    //                     { name: 'InventoryOverview', url: `/supply-chain/${companyId}/inventory/overview`, icon: 'circle', label: 'Inventory Overview', id: 'InventoryOverview', parentId: 'supplyChainInventory' },
    //                     { name: 'InventoryHighlights', url: `/supply-chain/${companyId}/inventory/highlights`, icon: 'circle', label: 'Inventory Highlights', id: 'InventoryHighlights', parentId: 'supplyChainInventory' },
    //                 ]
    //             },
    //         ]
    //     });

    // menuItems.push(
    //     {
    //         name: 'AutoEmails', url: `/auto-emails/${companyId}`, icon: 'mail', label: 'Auto Emails', id: 'autoEmails',
    //         children: [
    //             { name: 'Dashboard', url: `/dashboard/${companyId}`, icon: 'apps', label: 'Dashboard', id: 'autoEmailDs', parentId: 'autoEmails' },
    //             { name: 'Campaigns', url: `/auto-emails/${companyId}/campaigns`, icon: 'mail2', label: 'Campaigns', id: 'campaigns', parentId: 'autoEmails' },
    //         ]
    //     }
    // );

    // const salesCats: Array<any> = [];
    //
    // for (const category of salesCategories) {
    //     salesCats.push(
    //         { name: category['name'], url: `/sales/${companyId}/channels/${category['id']}`, icon: 'circle', label: category['name'], id: `salesChanels-${category['name']}`, parentId: 'salesChanels' },
    //     );
    // }
    // menuItems = [...menuItems, ...[{
    //     name: 'Sales', url: '/sales', icon: 'sales', label: 'Sales', id: 'sales',
    //     children: [
    //         { name: 'Dashboard', url: '/sales/dashboard', icon: 'apps', label: 'Dashboard', id: 'salesDs', parentId: 'sales' },
    //         { name: 'CostControl', url: '/sales/cost-control', icon: 'cost_control', label: 'Cost Control', id: 'salesCC', parentId: 'sales' },
    //         {
    //             name: 'SalesChannel', url: `/sales/${companyId}/channels`, icon: 'shop', label: 'Sales Channels', id: 'salesChanels', parentId: 'sales',
    //             children: salesCats
    //         },
    //         {
    //             name: 'Optimization', url: '/sales/optimization', icon: 'optimization', label: 'Optimization', id: 'salesOpt', parentId: 'sales',
    //             children: [
    //                 { name: 'Dashboard', url: '/sales/optimization/dashboard', icon: 'circle', label: 'Dashboard', id: 'salesOptDS', parentId: 'salesOpt' },
    //                 { name: 'KeywordResearch', url: '/sales/optimization/keyword-research', icon: 'circle', label: 'Keyword Research', id: 'salesOptKS', parentId: 'salesOpt' },
    //
    //             ]
    //         },
    //     ]
    // },
    // {
    //     name: 'Finance', url: '/finance', icon: 'finance', label: 'Finance', id: 'finance',
    //     children: [
    //         { name: 'Dashboard', url: '/finance/dashboard', icon: 'apps', label: 'Dashboard', id: 'FinanceDashboard', parentId: 'finance' },
    //         {
    //             name: 'Payments', url: '/finance/payments', icon: 'finance', label: 'Payments', id: 'FinancePayments', parentId: 'finance',
    //             children: [
    //                 { name: 'UpcomingPayments', url: `/supply-chain/${companyId}/finance/payments/upcoming`, icon: 'circle', label: 'Upcoming', id: 'UpcomingPayments', parentId: 'supplyChainInventory' },
    //                 { name: 'PaidPayments', url: `/supply-chain/${companyId}/finance/payments/paid`, icon: 'circle', label: 'Paid', id: 'PaidPayments', parentId: 'supplyChainInventory' },
    //                 { name: 'OverduePayments', url: `/supply-chain/${companyId}/finance/payments/overdue`, icon: 'circle', label: 'Overdue', id: 'OverduePayments', parentId: 'supplyChainInventory' },
    //             ]
    //         },
    //     ],
    // },
    // {
    //     name: 'Settings', url: `/settings/${companyId}`, icon: 'settings', label: 'Settings', id: 'settings',
    // }
    // ]];

    return menuItems;
}



const getMainMenuItems = (companyId: number | string) => {
    const mainMenuItems: Array<MenuItemProp> = [
        { name: 'Dashboard', url: `/dashboard/${companyId}`, icon: 'home', label: 'Dashboard', id: 'dashboard' },
        { name: 'My Profile', url: `/profile/${companyId}/general`, icon: 'user', label: 'My Profile', id: 'myProfile' },
        // { name: 'My Clients', url: `/clients/${companyId}`, icon: 'bag', label: 'My Clients', id: 'myClients' },
        {
            name: 'Settings', url: `/settings/${companyId}`, icon: 'settings', label: 'Settings', id: 'settings',
        }
    ];

    return mainMenuItems;
}



const findAllParent = (menuItems: Array<any>, menuItem: any) => {
    let parents: Array<any> = [];
    const parent = findMenuItem(menuItems, menuItem['parentId']);

    if (parent) {
        parents.push(parent['id']);
        if (parent['parentId'])
            parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
}

const findMenuItem = (menuItems: Array<any>, menuItemId: any) => {
    if (menuItems) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].id === menuItemId) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemId);
            if (found) return found;
        }
    }
    return null;
}

export { getMenuItems, getMainMenuItems, findAllParent, findMenuItem };

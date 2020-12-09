export interface MenuItemProp {
    id: string,
    parentId?: string,
    name: string,
    url: string,
    icon?: string,
    label: string,
    active?: boolean,
    children?: Array<MenuItemProp>
}


const getMenuItems = (companyId: string, vendorCategories: any) => {

    let menuItems: Array<MenuItemProp> = [
        { name: 'Dashboard', url: `/dashboard/${companyId}`, icon: 'home', label: 'Dashboard', id: 'dashboard' },
        {
            name: 'ProductManagement', url: `/product-management/${companyId}`, icon: 'box', label: 'Product Management', id: 'prodManagement',
            children: [
                { name: 'Dashboard', url: `/product-management/${companyId}/dashboard`, icon: 'apps', label: 'Dashboard', id: 'prodDs', parentId: 'prodManagement' },
                { name: 'Components', url: `/product-management/${companyId}/components`, icon: 'components', label: 'Components', id: 'prodComps', parentId: 'prodManagement' },
                { name: 'Products', url: `/product-management/${companyId}/products`, icon: 'products', label: 'Products', id: 'prodProds', parentId: 'prodManagement' }
            ]
        }];

    const supplierChainVendors: Array<any> = [];

    for (const category of vendorCategories) {
        supplierChainVendors.push(
            { name: category['name'], url: `/supply-chain/${companyId}/vendors/${category['id']}`, icon: 'circle', label: category['name'], id: `supplyVendors-${category['name']}`, parentId: 'supplyVendors' },
        );
    }

    menuItems.push(
        {
            name: 'SupplyChain', url: `/supply-chain/${companyId}`, icon: 'refresh', label: 'Supply Chain', id: 'supplyChain',
            children: [
                {
                    name: 'Vendors', url: `/supply-chain/${companyId}/vendors`, icon: 'shop', label: 'Vendors', id: 'supplyVendors', parentId: 'supplyChain',
                    children: supplierChainVendors
                },
                { name: 'Orders', url: `/supply-chain/${companyId}/orders`, icon: 'shopping-cart', label: 'Orders', id: 'supplyChainOrders', parentId: 'supplyChain' },
                { name: 'Shipment', url: `/supply-chain/${companyId}/shipment`, icon: 'shipment', label: 'Shipment', id: 'supplyChainShipments', parentId: 'supplyChain' },
                {
                    name: 'Inventory', url: `/supply-chain/${companyId}/inventory`, icon: 'inventory', label: 'Inventory', id: 'supplyChainInventory', parentId: 'supplyChain',
                    children: [
                        { name: 'InventoryValuation', url: `/supply-chain/${companyId}/inventory/valuation`, icon: 'circle', label: 'Inventory Valuation', id: 'InventoryValuation', parentId: 'supplyChainInventory' },
                        { name: 'WarehouseLocation', url: `/supply-chain/${companyId}/inventory/locations`, icon: 'circle', label: 'Warehouse Location', id: 'WarehouseLocation', parentId: 'supplyChainInventory' },
                        { name: 'InventoryOverview', url: `/supply-chain/${companyId}/inventory/overview`, icon: 'circle', label: 'Inventory Overview', id: 'InventoryOverview', parentId: 'supplyChainInventory' },
                    ]
                },
            ]
        });

    menuItems = [...menuItems, ...[{
        name: 'Sales', url: '/sales', icon: 'sales', label: 'Sales', id: 'sales',
        children: [
            { name: 'Dashboard', url: '/sales/dashboard', icon: 'box-2', label: 'Dashboard', id: 'salesDs', parentId: 'sales' },
            { name: 'CostControl', url: '/sales/cost-control', icon: 'cost_control', label: 'Cost Control', id: 'salesCC', parentId: 'sales' },
            {
                name: 'SalesChannel', url: '/sales/sales_channel', icon: 'shop', label: 'SalesChannel', id: 'salesChanels', parentId: 'sales',
                children: [
                    { name: 'Amazon', url: '/sales/amazon', icon: 'circle', label: 'Amazon', id: 'salesChanelsAZ', parentId: 'salesChanels' },
                    { name: 'Distributor', url: '/sales/circle', icon: 'circle', label: 'Distributor', id: 'salesChanelsDist', parentId: 'salesChanels' },
                    { name: 'Retail', url: '/sales/retail', icon: 'circle', label: 'Retail', id: 'salesChanelsRT', parentId: 'salesChanels' },
                    { name: 'Website', url: '/sales/website', icon: 'circle', label: 'Website', id: 'salesChanelsWB', parentId: 'salesChanels' }
                ]
            },
            {
                name: 'Optimization', url: '/sales/optimization', icon: 'optimization', label: 'Optimization', id: 'salesOpt', parentId: 'sales',
                children: [
                    { name: 'Dashboard', url: '/sales/optimization/dashboard', icon: 'circle', label: 'Dashboard', id: 'salesOptDS', parentId: 'salesOpt' },
                    { name: 'KeywordResearch', url: '/sales/optimization/keyword-research', icon: 'circle', label: 'Keyword Research', id: 'salesOptKS', parentId: 'salesOpt' },

                ]
            },
        ]
    },
    {
        name: 'Finance', url: '/finance', icon: 'finance', label: 'Finance', id: 'finance',
        children: [
            { name: 'CashFlow', url: '/finance/cashflow', icon: 'cash_flow', label: 'Cash Flow', id: 'financeCF', parentId: 'finance' },
        ]
    }]];

    return menuItems;
}



const mainMenuItems: Array<MenuItemProp> = [
    { name: 'My Profile', url: '/profile/general', icon: 'user', label: 'My Profile', id: 'myProfile' },
    { name: 'Companies', url: '/companies', icon: 'bag', label: 'Companies', id: 'myCompanies' },
];

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

export { getMenuItems, mainMenuItems, findAllParent, findMenuItem };
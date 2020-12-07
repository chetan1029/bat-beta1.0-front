export interface MenuItemProp {
    id: number,
    parentId?: number,
    name: string,
    url: string,
    icon?: string,
    label: string,
    active?: boolean,
    companyId?: boolean,
    children?: Array<MenuItemProp>
}

const menuItems: Array<MenuItemProp> = [
    { name: 'Dashboard', url: '/', icon: 'home', label: 'Dashboard', id: 1 },
    {
        name: 'ProductManagement', url: '/product-management', icon: 'box', label: 'Product Management', id: 2,
        children: [
            { name: 'Dashboard', url: '/product-management', icon: 'apps', label: 'Dashboard', id: 3, parentId: 2, },
            { name: 'Components', url: '/product-management/components', icon: 'components', label: 'Components', id: 4, parentId: 2, companyId: true, },
            { name: 'Products', url: '/product-management/products', icon: 'products', label: 'Products', id: 5, parentId: 2, }
        ]
    },
    {
        name: 'SupplyChain', url: '/supply-chain', icon: 'refresh', label: 'Supply Chain', id: 6,
        children: [
            {
                name: 'Vendors', url: '/supply-chain/vendors', icon: 'shop', label: 'Vendors', id: 7, parentId: 6,
                children: [
                    { name: 'Fulfillments', url: '/supply-chain/fulfillments', icon: 'circle', label: 'Fulfillment\'s', id: 8, parentId: 7 },
                    { name: 'Logistics', url: '/supply-chain/logistics', icon: 'circle', label: 'Logistics', id: 9, parentId: 7 },
                    { name: 'Manufacturers', url: '/supply-chain/manufacturers', icon: 'circle', label: 'Manufacturers', id: 10, parentId: 7 },
                    { name: 'Supplier', url: '/supply-chain/supplier', icon: 'circle', label: 'Supplier', id: 11 }
                ]
            },
            { name: 'Orders', url: '/supply-chain/orders', icon: 'shopping-cart', label: 'Orders', id: 12, parentId: 6 },
            { name: 'Shipment', url: '/supply-chain/shipment', icon: 'shipment', label: 'Shipment', id: 13, parentId: 6 },
            {
                name: 'Vendors', url: '/supply-chain/vendors', icon: 'inventory', label: 'Vendors', id: 14, parentId: 6,
                children: [
                    { name: 'InventoryValuation', url: '/supply-chain/fulfillments', icon: 'circle', label: 'Inventory Valuation', id: 8, parentId: 14 },
                    { name: 'WarehouseLocation', url: '/supply-chain/logistics', icon: 'circle', label: 'Warehouse Location', id: 9, parentId: 14 },
                    { name: 'InventoryOverview', url: '/supply-chain/manufacturers', icon: 'circle', label: 'Inventory Overview', id: 10, parentId: 14 },
                ]
            },
        ]
    },
    {
        name: 'Sales', url: '/sales', icon: 'sales', label: 'Sales', id: 7,
        children: [
            { name: 'Dashboard', url: '/sales/dashboard', icon: 'box-2', label: 'Dashboard', id: 9, parentId: 7 },
            { name: 'CostControl', url: '/sales/cost-control', icon: 'cost_control', label: 'Cost Control', id: 10, parentId: 7 },
            {
                name: 'SalesChannel', url: '/sales/sales_channel', icon: 'shop', label: 'SalesChannel', id: 8, parentId: 7,
                children: [
                    { name: 'Amazon', url: '/sales/amazon', icon: 'circle', label: 'Amazon', id: 20, parentId: 8 },
                    { name: 'Distributor', url: '/sales/circle', icon: 'circle', label: 'Distributor', id: 9, parentId: 8 },
                    { name: 'Retail', url: '/sales/retail', icon: 'circle', label: 'Retail', id: 10, parentId: 8 },
                    { name: 'Website', url: '/sales/website', icon: 'circle', label: 'Website', id: 11 }
                ]
            },
            {
                name: 'Optimization', url: '/sales/optimization', icon: 'optimization', label: 'Optimization', id: 11, parentId: 7,
                children: [
                    { name: 'Dashboard', url: '/sales/optimization/dashboard', icon: 'circle', label: 'Dashboard', id: 8, parentId: 11 },
                    { name: 'KeywordResearch', url: '/sales/optimization/keyword-research', icon: 'circle', label: 'Keyword Research', id: 9, parentId: 11 },

                ]
            },
        ]
    },
    {
        name: 'Finance', url: '/finance', icon: 'finance', label: 'Finance', id: 8,
        children: [
            { name: 'CashFlow', url: '/finance/cashflow', icon: 'cash_flow', label: 'Cash Flow', id: 9, parentId: 8 },
        ]
    }
];


const mainMenuItems: Array<MenuItemProp> = [
    { name: 'My Profile', url: '/profile', icon: 'user', label: 'My Profile', id: 1 },
    { name: 'Companies', url: '/companies', icon: 'bag', label: 'Companies', id: 2 },
];

const findAllParent = (menuItems: Array<any>, menuItem: any) => {
    let parents: Array<any> = [];
    const parent = menuItems.find(i => i['id'] === menuItem['parentId']);

    if (parent) {
        parents.push(parent['id']);
        if (parent['parentId'])
            parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
}

export { menuItems, mainMenuItems, findAllParent };
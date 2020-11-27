export interface MenuItemProp {
    id: number,
    parentId?: number,
    name: string,
    url: string,
    icon?: string,
    label: string,
    active?: boolean,
    children?: Array<MenuItemProp>
}

const menuItems: Array<MenuItemProp> = [
    { name: 'Dashboard', url: '/', icon: 'home', label: 'Dashboard', id: 1 },
    {
        name: 'ProductManagement', url: '/product-management', icon: 'box', label: 'Product Management', id: 2,
        children: [
            { name: 'Dashboard', url: '/product-management', icon: 'apps', label: 'Dashboard', id: 3, parentId: 2, },
            { name: 'Components', url: '/product-management/components', icon: 'components', label: 'Components', id: 4, parentId: 2, },
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
            { name: 'Orders', url: '/supply-chain/orders', icon: 'shopping-cart', label: 'Orders', id: 12, parentId: 6 }
        ]
    }
];

const findAllParent = (menuItems: Array<any>, menuItem: any) => {
    let parents:Array<any> = [];
    const parent = menuItems.find(i => i['id'] === menuItem['parentId']);

    if (parent) {
        parents.push(parent['id']);
        if (parent['parentId'])
            parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
}

export { menuItems, findAllParent };
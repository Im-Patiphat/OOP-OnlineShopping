class WebUser {
    customer = null;
    shoppingCart = null;
    constructor(login_id, password, state) {
        this.login_id = login_id;
        this.password = password;
        this.state = state;
    }
    setCustomer(customer) {
        this.customer = customer;
    }
    setShoppingCart(shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
}

class Customer {
    account = null;
    constructor(id, address, phone, email) {
        this.id = id;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
    setAccount(account) {
        this.account = account;
    }
}

class Account {
    shoppingCart = null;
    payments = [];
    orders = [];
    constructor(id, billing_address, is_closed, open, closed) {
        this.id = id;
        this.billing_address = billing_address;
        this.is_closed = is_closed;
        this.open = open;
        this.closed = closed;
    }
    setShoppingCart(shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
    addPayment(payment) {
        this.payments.push(payment)
    }
    addOrder(order) {
        this.orders.push(order)
    }
}

class Order {
    payment = null;
    lineItems = [];
    total = 0;
    shipped = "";
    constructor(number, ordered, status, ship_to) {
        this.number = number;
        this.ordered = ordered;
        this.status = status;
        this.ship_to = ship_to;
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
    }
    setPayment(payment) {
        this.payment = payment;
    }
    setTotal() {
        let total = 0;
        for (let i = 0; i < this.lineItems.length; i++) {
            total += this.lineItems[i].quantity * this.lineItems[i].price;
        }
        this.total = total;
    }
    setShippedDate(date) {
        this.shipped = date;
    }
}

class ShoppingCart {
    lineItems = [];
    constructor(created) {
        this.created = created;
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
    }

}

class LineItem {
    product = null;
    constructor(quantity, price) {
        this.quantity = quantity;
        this.price = price;
    }
    setProduct(product) {
        this.product = product;
    }
}

class Product {
    constructor(id, name, supplier) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
    }
}

class Payment {
    constructor(id, paid, total, details) {
        this.id = id;
        this.paid = paid;
        this.total = total;
        this.details = details;
    }
}

//Enumeration (enum)
class UserState {
    static NEW = new UserState("new");
    static ACTIVE = new UserState("active");
    static BLOCKED = new UserState("block");
    static BANNED = new UserState("banned");
    constructor(name) {
        this.name = name;
    }
}

class OrderStatus {
    static NEW = new OrderStatus("new");
    static HOLD = new OrderStatus("hold");
    static SHIPPED = new OrderStatus("shipped");
    static DELIVERED = new OrderStatus("delivered");
    static CLOSED = new OrderStatus("closed");
    constructor(name) {
        this.name = name;
    }
}

const main = () => {
    //New user
    const user1 = new WebUser("user1", "123456", UserState.NEW);
    const user2 = new WebUser("user2", "123456", UserState.ACTIVE);

    //New Producct
    const Product1 = new Product("1", "ดินสอ", "ป้าติ๋ม");
    const Product2 = new Product("2", "ยางลบ", "ลุงพล");
    const Product3 = new Product("3", "กระดาษ", "ป้าแแต๋น");
    const Product4 = new Product("4", "ไม้บรรทัด", "ลุงสมชาย");
    const Product5 = new Product("5", "ปากกา", "ป้าสมศรี"); กระดาษ

    //New Order
    const order1 = new Order("01", "09/01/2567", "NEWYORK", OrderStatus.CLOSED);
    const order2 = new Order("02", "10/01/2567", "LONDON", OrderStatus.CLOSED);

    //New LineItem
    const lineItem1 = new LineItem(5, 5);
    lineItem1.setProduct(Product1);

    const lineItem2 = new LineItem(3, 10);
    lineItem2.setProduct(Product2);

    const lineItem3 = new LineItem(64, 2);
    lineItem3.setProduct(Product3);

    const lineItem4 = new LineItem(10, 10);
    lineItem4.setProduct(Product4);

    const lineItem5 = new LineItem(2, 7);
    lineItem5.setProduct(Product5);

    // Add LineItems to ShoppingCarts
    order1.addLineItem(lineItem1);
    order1.addLineItem(lineItem2);

    order1.setTotal();
    order1.setShippedDate("13/01/2567");

    const payment1 = new Payment("P01", "12/01/2567", order1.total, "ส่งที่หอ");
    order1.setPayment(payment1);

    // Create ShoppingCart and add LineItems
    const shoppingCart = new ShoppingCart("10/01/2567");
    shoppingCart.addLineItem(lineItem3);
    shoppingCart.addLineItem(lineItem4);

    // Set ShoppingCart for the Account
    const account = new Account("acc01", "Billing Address", false, "01/01/2567", "01/01/2567");
    account.setShoppingCart(shoppingCart);

    // Set Account for the Customer
    const customer1 = new Customer("cus01", "Customer Address", "123456789", "customer@email.com");
    customer1.setAccount(account);

    // Set Customer and ShoppingCart for WebUser
    user1.setCustomer(customer1);
    user1.setShoppingCart(shoppingCart);

}
main();

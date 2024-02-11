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
    //แสดงรายละเอียดOrder
    printOrderDetail() {
        for (let i = 0; i < this.orders.length; i++) {
            console.log("คำสั่งซื้อที่ : " + (1 + i));
            this.orders[i].printDetail()

        } this.setTotal()
    }
    //แสดงจำนวนออเดอร์และราคารวมทั้งหมด
    setTotal() {
        let total = 0;
        for (let i = 0; i < this.orders.length; i++) {
            total += this.orders[i].total;
        }
        console.log(
            "มี " + this.orders.length + " ออเดอร์ ราคารวมทั้งหมด : " + total
        );
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
    //การคำนวนราคารวม total += จำนวนสินค้า คูณ ราคาต่อชิ้น จะได้ราคารวมทั้งหมด
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
    //แสดงรายละเอียดสินค้าในOrder
    printDetail() {
        for (let i = 0; i < this.lineItems.length; i++) {
            console.log("รายการที่ : " + (1 + i) + this.lineItems[i].getDetail());
        }
        this.setTotal();
        console.log("ราคารวม : " + this.total + " บาท");
        console.log("ชำระวันที่ : " + this.payment.paid + " เป็นจำนวนเงิน " + this.payment.total + " บาท ");

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
    //แสดงสินค้าในตระกร้า
    printShoppingCart() {
        console.log("----------In Cart-----------")
        console.log("มีสินค้าทั้งหมด " + this.lineItems.length + " รายการ");
        for (let i = 0; i < this.lineItems.length; i++) {
            console.log("รายการที่ : " + (1 + i) + this.lineItems[i].getDetail());

        }
        console.log("ราคารวม : " + this.calcTotal() + " บาท");
        console.log("----------------------------")
    }
    //การคำนวนราคารวม total += จำนวนสินค้า คูณ ราคาต่อชิ้น จะได้ราคารวมทั้งหมด
    calcTotal() {
        let total = 0;
        for (let i = 0; i < this.lineItems.length; i++) {
            total += this.lineItems[i].quantity * this.lineItems[i].price;
        }
        return total
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
    getDetail() {
        return (
            " " + this.product.name +
            " จำนวน " +
            this.quantity +
            " ราคา " +
            this.price +
            " บาท"
        );
    }
    //การคำนวนราคา จำนวนสินค้า คูณ ราคาต่อชิ้น จะได้ราคาของรายการสิ้นค้า
    calcSubTotal() {
        return this.quantity * this.price;
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
    const Product5 = new Product("5", "ปากกา", "ป้าสมศรี");

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

    // Add LineItems to order
    order1.addLineItem(lineItem1);
    order1.addLineItem(lineItem2);

    order2.addLineItem(lineItem3);
    order2.addLineItem(lineItem4);
    order2.addLineItem(lineItem5);

    //set ราคารวมกับวันจัดส่วในOrder

    order1.setTotal();
    order1.setShippedDate("13/01/2567");

    order2.setTotal();
    order2.setShippedDate("13/01/2567");

    //New Payment

    const payment1 = new Payment("P01", "12/01/2567", order1.total, "ส่งที่หอ");
    //set Payment to Order
    order1.setPayment(payment1);

    const payment2 = new Payment("P02", "12/01/2567", order2.total, "ส่งที่หอ");
    order2.setPayment(payment2);

    // Create ShoppingCart and add LineItems
    const shoppingCart = new ShoppingCart("10/01/2567");
    shoppingCart.addLineItem(lineItem1);
    shoppingCart.addLineItem(lineItem4);



    // Set ShoppingCart for the Account
    const account = new Account("Patiphat", "หอลิขิต", true, "01/01/2567", "");
    account.addOrder(order1);
    account.addOrder(order2);

    account.setShoppingCart(shoppingCart);

    // Set Account for the Customer
    const customer1 = new Customer("cus01", "Customer Address", "123456789", "customer@email.com");
    customer1.setAccount(account);

    // Set Customer and ShoppingCart for WebUser
    user1.setCustomer(customer1);
    user1.setShoppingCart(shoppingCart);


    console.log("ชื่อ : " + account.id);
    console.log("จำนวนคำสั่ง : " + account.orders.length);
    account.printOrderDetail();
    account.shoppingCart.printShoppingCart()
}
main();

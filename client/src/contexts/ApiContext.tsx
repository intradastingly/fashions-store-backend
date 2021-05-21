import { createContext, useEffect, useState } from "react";

export interface ISession {
  /* id: string, */
  userName: string;
  password: string;
}

export interface ProductInfo {
  category: [];
  description: String;
  quantity: Number;
  title: String;
  img: string;
  price: Number;
  _id: String;
}

export interface ShippingInfo {
  shipmentCompany: string,
  deliveryTime: number,
  shippingPrice: Number,
  _id: String
}

const userSession: ISession = {
  /* id: "", */
  userName: "",
  password: "",
};
  interface State {
    session: ISession;
    allProducts: ProductInfo[];
    shippingMethods: ShippingInfo[];
  }


interface ContextValue extends State {
  updateLoginInfo: (userSession: ISession) => void;
  getOrder: (order: any) => void;
  loginHandler: (loginCredentials: ISession, history?: any) => void;
}

export const ApiContext = createContext<ContextValue>({
  session: userSession,
  allProducts: [],
  shippingMethods: [],
  updateLoginInfo: () => {},
  getOrder: () => {},
  loginHandler: () => {},
});
  export interface shippingMethods extends ShippingInfo {
    shippingMethods: shippingMethods
  }
  interface Props {
    children: Object;
  }
  
  function ApiProvider(props: Props) {
    const [allProducts, setAllProducts] = useState<any>();
    const [shippingMethods, setShippingMethods] = useState<any>();
    const [session, setSession] = useState<any>();
    const [order, setOrder] = useState<any>();
    const [userNameValidation, setUserNameValidation] = useState<boolean>();

    console.log(session)
    console.log(userNameValidation)

    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetch("/api/products", {
                method: "GET",
                headers: {
                    "Content-type": "application-json"
                }
            })
            const products = await response.json()
            setAllProducts(products)
        }
        loadProducts()

        const loadShippingMethods = async () => {
          const response = await fetch("/api/shipping", {
            method: "GET",
            headers: {
              "Content-type": "application-json"
            }
          })

          const shipping = await response.json();
          setShippingMethods(shipping)
        }
        loadShippingMethods()
    }, []);

    
    useEffect(() => {
      const authorizeSession = async () => {
        const response = await fetch(`api/authenticated`, {
          method: "GET",
      })
      const session = await response.json()
      setSession(session)
      }
      authorizeSession();
    }, []);
    

  async function loginHandler(loginCredentials: ISession, history: any) {
    const response = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result)
    if (result.message === "Incorrect user name or password") {
      setUserNameValidation(true);
    } else {
      setUserNameValidation(false);
    }
    /* history.push("/profile"); */
    return response;
  }

  
 

  async function updateLoginInfo(loginInfo: ISession) {
    /* setSession(loginInfo)
        console.log(loginInfo) */
  }

  async function getOrder(order: any) {
    console.log(order);
    setOrder(order);
  }
  
    return (
      <ApiContext.Provider
        value={{
          allProducts: allProducts,
          session: session,
          shippingMethods: shippingMethods,
          updateLoginInfo: updateLoginInfo,
          getOrder: getOrder,
          loginHandler: loginHandler,
        }}
      >
        {props.children}
      </ApiContext.Provider>
    );

  }


export const ApiConsumer = ApiContext.Consumer;
export default ApiProvider;

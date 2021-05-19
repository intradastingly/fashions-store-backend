import { Row, Col, message, Button } from 'antd';
import { Component, ContextType, CSSProperties } from 'react'; 
import { Image } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Product } from "../ProductItemsList";
import { CartContext } from '../../contexts/CartContext';
import ErrorPage from '../ErrorPage';
import { ProductInfo } from "../../contexts/CartContext"
interface State {
    product?: ProductInfo;
}
interface Props extends RouteComponentProps {
    id: number
}
const success = () => {
    message.success('The product was added to the cart', 5);
};
class ProductDetails extends Component <Props, State> {
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;
   
    state: State = {
        product: undefined,
    }

    componentDidMount() {   
        // const products = JSON.parse(localStorage.getItem('products') as string) || [];
        const Allproducts = this.context.allProducts
        const productId = String((this.props.match.params as any).id)
        const product = Allproducts.find((p: ProductInfo) => p._id === productId);
        this.setState({product: product})
    }

    handleAddClick = () => {
        // const { addProductToCart } = this.context;
        success();
       // addProductToCart(this.state.product!, undefined)
    }

    render () {
        // if (!this.state.product) {
        //     return <ErrorPage />
        // }
       
        return (
            <Row style={detailContainer}>
                <Col lg={{span: 10}} style={columnStyle}>
                    <Image src={"BILD BILD"} />          
                </Col>

                <Col lg={{span: 10}} style={columnStyle}>
                    <h2 style={titleStyle}>{this.state.product?.title}</h2>
                    <h4>{this.state.product?.description} </h4>
                    <h2 style={price}>{"här kommer priset sen"} </h2>
                    <Button 
                        type="primary" 
                        style={{ marginTop: '1rem', width: '8rem', marginBottom: '6rem' }} 
                        onClick={this.handleAddClick}
                    >
                        Add to cart 
                    </Button>
                </Col>
            </Row>
        ); 
    }    
}

export default withRouter(ProductDetails as any); 

const detailContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    margin: 'auto',
}

const columnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10rem',
    marginBottom: '5rem',
}

const titleStyle: CSSProperties = {
   fontSize: '2rem'
}

const price: CSSProperties = {
    fontWeight: 'bold'
}
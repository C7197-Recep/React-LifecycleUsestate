import {Component} from "react";

var timeout;

class TestComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"Test name",
            // color:this.props.color
            counter:0,
            isVisible:true
        }
        console.log("Hello from constructor");
        console.log(this.props.color);
    }

    /* LIFECYCLE
    1. constructor
    2. getDerivedStateFromProps
    3. shouldComponentUpdate
    4. render
    5. getSnapshotBeforeUpdate
    6. componentDidMount - componentDidUpdate
    7. componentWillUnmount
    */
   
    /*App.js den gönderilen propu state aktarmak için
    constructor kullanmak şart değil. 
    aşağıdaki fonksiyonu react bu maksatla oluşturmuş*/
    static getDerivedStateFromProps(props, state){
        console.log("Hello from getDriveStateFromProps");
        console.log("props:", props);
        console.log("state:", state);
        /*state e ekler ya da değiştirir
        renderdan önce bu fonksiyon çalışıyor*/
        return {color:"green"};
        // return {surname:"test2"};
    }

    /*Bu fonksiyon ilk açılışta getDerivedStateFromProps'dan ve render dan sonra çalışıyor
    yeri değiştirilse bile bu şekilde*/
    componentDidMount(){
        console.log("Hello from compDidMount");
        console.log("state:", this.state);
        /*eğer bunu temizlemeden componentwillunmount çağırılırsa hata veriyor
        componentwillunmount öncesi burayı nasıl temizliycez ki hata vermesin? 
        componentWillUnmout içinde clearTimeout ile bu eventi temizlememiz gerek hata vermemesi için*/
        timeout=setTimeout(()=>{
            this.setState({counter:this.state.counter+1});
        },3000); 
    }

    /*renderdan sonra çağırılır. updateden önceki state i verir*/
    getSnapshotBeforeUpdate(){
        console.log("prevprops:", this.prevprops);
        console.log("prevstates:", this.prevstate);
        return null;
    }

    /*arayüz update edildiğinde*/
    componentDidUpdate(){
        console.log("Hello from compDidUpdate");
        console.log("state:", this.state);

    }

    /*arayüzden component çıkartılırken çağırılır*/
    componentWillUnmount(){
        console.log("Hello from compWillUnmount");
        console.log("state:", this.state);
        clearTimeout(timeout);
    }

    /*Bu da reactın fonksiyonu.
    getDerivedStateFromPropsdan sonra çalışır.
    return false dersek html arayüzü güncellenmez ama
    stateler vs güncellenir */
    shouldComponentUpdate(){
        console.log("inside shouldComponentUpdate");
        /*counter 5 olana kadar arayüzü güncelleme, sonra güncelle*/
        return this.state.counter<0 ? false : true;
    }

    /*Bu çağırıldığında yalnızca render ve constructor çağırılır
    diğer fonksiyonlar yeniden çağırılmaz */
    handleClick = ()=>{
        this.setState({counter:this.state.counter+1});
    }

    /*BU TÜR FONKSİYONLARI YALNIZCA CLASS İÇİNDE YANİ BURADA ÇAĞIRABİLİYORUZ ANLADIĞIM KADARIYLA
    ŞU AN BU FONKSİYONU KULLANMADIK. APP.JS İÇİNDE USESTATE İLE HALLETTİK BU İŞİ*/
    isVisible=()=>{
        this.setState({isVisible:!this.state.isVisible});
    }

    render(){
        console.log("rendered state:", this.state);
        return (
            <div>
                <p>We can get prop from App.js directly</p>
                <p>But in constroctor, we need to get props from super and constructor</p>
                <p>{this.props.color}</p>
                <p>{this.state.color}</p>
                <button onClick={this.handleClick}>INCREASE {this.state.counter}</button>                
            </div>
        );
    }
}

export default TestComponent;
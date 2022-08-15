import SorryCatImage from '../images/Sorry_Cart_Image.jpg'
function DeletedProductCheckout(id,setProdWasRemoved) {
    return (
        <div style={{display:'flex',alignItems:'center', margin:'5px',flexDirection:'column'}}>
            <img style={{width:'100%',height:'auto',marginTop:'10px'}} src = {SorryCatImage} alt ='Product Does Not exist'/>
            <p style={{padding:'10px'}}>
            <b>Please Remove from Cart<b/></b><br/> In Order Proceed with Confirm
            </p> 
            
        </div>
    )
}

export default DeletedProductCheckout
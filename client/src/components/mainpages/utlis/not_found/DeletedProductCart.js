import SorryCatImage from '../images/Sorry_Cart_Image.jpg'
function DeletedProductCart({removeProduct,id,setProdWasRemoved}) {
    return (
        <div style={{display:'flex'}}>
         <img style={{width:'100px',height:'100px',margin:'10px 10px 10px 30px',}} src = {SorryCatImage} alt ='Product Does Not exist'/>
        <div style={{display:'grid',alignItems:'center' ,width:'100%'}} >
        
       
            <p style={{padding:'10px'}}>
            <b> Please Remove<b/></b> In Order Proceed with Checkout 
            </p> 
           <div>
           <p
                  id="remove"
                  style={{
                    cursor: "pointer",
                    fontSize: "15px",
                    marginRight:'10px',
                    
                    float: "right",
                    padding: "5px",
                    paddingTop: "3px",
                    
                   
                    
                  }}
                  onClick={()=>{removeProduct(id)}}
                 
                >
                  {" "}
                  <i className="fa fa-trash trash-bucket" aria-hidden="true"></i>
                </p>
           
        </div>
            
        </div>
        </div>
    )
}

export default DeletedProductCart
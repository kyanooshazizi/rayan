export const MethodFlagHandler = (datastore) => {
    switch (datastore.service) {
      case "بسته":
        return (
          datastore.pick_up &&
          datastore.delivery &&
          (datastore.package.packB.number ||
            datastore.package.packM.number ||
            datastore.package.packS.number ||
            datastore.document.number) &&
          datastore.Price &&
          datastore.pickup_date &&
          datastore.Insurance.Product_value &&
          datastore.Insurance.Product_content
        );
      case "پاکت":
        return (
          datastore.pick_up &&
          datastore.delivery &&
          (datastore.document.afour.number ||
          datastore.document.athree.number) &&
          datastore.Price &&
          datastore.pickup_date &&
          datastore.Insurance.Product_value
        );
    }
    return null;
  };
  export const MethodFlagHandlerAddress = (datastore) => {
   
        return (
          datastore.SenderName &&
          datastore.SenderMobile &&
          datastore.SenderAddress &&
          datastore.ReceiverName &&
          datastore.ReceiverMobile &&
          datastore.ReceiverAddress&&
          datastore.Sendervahed&&
          datastore.Senderpelak&&
          datastore.Sendertabaghe&&
          datastore.Receiverpelak&&
          datastore.Receivervahed&&
          datastore.Receivertabaghe       
        );
    
  };
  
export const MethodFlagHandler = (datastore) => {
  return (
    !!(datastore.pick_up &&
    datastore.delivery &&
    (datastore.package.packB.number ||
      datastore.package.packM.number ||
      datastore.package.packS.number ||
      datastore.document.number) &&
    datastore.Price &&
    datastore.pickup_date &&
    datastore.Insurance.Product_value &&
    datastore.Insurance.Product_content)
  );
};
export const MethodFlagHandlerAddress = (datastore) => {
  return (
    !!(datastore.SenderName &&
    datastore.SenderMobile &&
    datastore.Sendervahed &&
    datastore.Senderpelak &&
    datastore.SenderAddress &&
    datastore.ReceiverName &&
    datastore.ReceiverMobile &&
    datastore.ReceiverAddress &&
    datastore.Receiverpelak &&
    datastore.Receivervahed &&
    datastore.iddistrict_sender&&
    datastore.iddistrict_resiver)
  );
};

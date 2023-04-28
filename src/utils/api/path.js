const localhost = 'http://192.168.1.2:8282';
const microbox = 'https://kimoi-api.microbox.tech';
const baseUrl = microbox;

export default {
  user: {
    auth: `${baseUrl}/user/auth`,
    get: `${baseUrl}/user`,
  },
  productCategory: {
    getAll: `${baseUrl}/productcategory/getall`,
  },
  product: {
    get: `${baseUrl}/product/get`,
  },
  order: {
    get: `${baseUrl}/order/get`,
  },
  client: {
    default: `${baseUrl}/client`,
  },
  comboService: {
    default: `${baseUrl}/servicecategory`,
  },
  servicePackage: {
    default: `${baseUrl}/servicepackage`,
  },
  contract: {
    default: `${baseUrl}/contract`,
    total: `${baseUrl}/contract/total`,
    active: `${baseUrl}/contract/active`,
  },
  relation: {
    default: `${baseUrl}/relation`,
  },
  transaction: {
    default: `${baseUrl}/transaction`,
  },
};

import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}
 
export default Meta;

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  keywords: 'electronics, buy electronics, ecommerce',
  description: 'Vendemos los mejores productos al mejor precio'
}
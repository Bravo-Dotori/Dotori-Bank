import { Helmet } from 'react-helmet-async';
import logo from '@/assets/logo.png';

const Seo = ({
    title = '도토리뱅크',
    description = '도토리뱅크 금융 서비스',
    keywords = '금융, 예금, 적금, 송금',
    image = logo,
    url = window.location.href,
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default Seo;
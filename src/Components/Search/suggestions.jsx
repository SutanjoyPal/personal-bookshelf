import './Style.css'
import Card from '../Card';

//mpas data from pages to display as cards
export default function Suggestions({ data, flag }) {

  return (
    <div className='card-container'>
      {data && data.length
        ? data.map((item, index) => (
          <Card item={item} flag={flag}/>
        ))
        : null
      }
    </div >
  );
}
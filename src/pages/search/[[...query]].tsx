import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function NameSearch() {
  const router = useRouter(); 
  const { q, s } = router.query;
  const [results, setResults] = useState([]);
  
  
  useEffect(()=> {
    const apiURL = `https://api.opencorporates.com/v0.4/companies/search?api_token=${process.env.OPENC_APIKEY}&q=${q?.replace(" ","+")}&per_page=10&page=1&country_code=us&jurisdiction_code=us_${s?.toLowerCase()}`
    console.log(apiURL);
    const fetchResults = async () =>{
      try {
        const res = await fetch(apiURL);
        const data = await res.json();
        console.log(data);
        setResults(data.results.companies);
        console.log(data.results.companies);
      } catch (err) {
        console.log(err);
      }
    }
    if (q){
      console.log("made api call");
      console.log("apiUrl",apiURL);
      fetchResults().catch(console.error);
    }
  },[q]);
  

	return (
		<div className={styles.container}>
			<main className={styles.main}>
        
        {results.length == 0 ?
           <div> No results</div>  :
            results?.map((c) => {
            return <div> {c?.company?.name}</div>})
        }
			</main>
		</div>
	);
}
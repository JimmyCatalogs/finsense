import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function NameSearch() {
  const router = useRouter(); 
  const { query } = router.query;
  console.log("query1",router.query);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [results, setResults] = useState([]);
  
  
  useEffect(()=> {
    const apiURL = `https://api.opencorporates.com/v0.4/companies/search?api_token=${process.env.OPENC_APIKEY}&q=${searchQuery}&per_page=10&page=1&country_code=us&jurisdiction_code=${stateQuery}`
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
    if (query){
      console.log("made api call");
      console.log("query", query);
      setSearchQuery(query[0]);
      setStateQuery(query[1]);
      //fetchResults().catch(console.error);
    }
  },[query]);
  

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
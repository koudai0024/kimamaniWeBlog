
const fetchWrap = async(url: string, options?: string) => {
    const key: object = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };
    
    const res = await fetch(
        `https://koudaiblog.microcms.io/api/v1/${url}?${options}`,
        key,
    );
    return await res.json();
  

}


export default fetchWrap
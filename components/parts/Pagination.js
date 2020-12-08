import Link from 'next/link'


const Pagination = (props) => {
    

    const limit = 10;
    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
   
    const paths = []
    range(1, Math.ceil(props.data.totalCount / limit)).map((p) => (
       paths.push(`/page/${p}`) 
    ))


    // const limit = 10;
    // const total = Math.ceil(props.data.totalCount / limit)

    console.log(paths)
    return (
        <div>
            <div>

                {
                    paths.map((item, index) => (
                        <div>
                            <Link href='page/[slug]' as={`page/${index + 1}`}>
                                <a>{ index + 1 }</a>
                            </Link>
                        </div>
                    ))
                }
            {/* {paths.map((item, index) => (
                <div key={index}>
                    <Link href={item}>
                        {index}
                    </Link>
                </div>
            ))} */}
            </div>

        </div>
    )
}





export default Pagination
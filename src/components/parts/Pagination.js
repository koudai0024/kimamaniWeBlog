import Link from 'next/link'
import styled from 'styled-components';



const Pagination = (props) => {
    

    const limit = 10;
    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
   
    const paths = []
    range(1, Math.ceil(props.data.totalCount / limit)).map((p) => (
       paths.push(`/page/${p}`) 
    ))



    return (
        <PaginationWrap>
            <PaginationList>
                {paths.map((item, index) => (
                    <PaginationItem key={index} className={(props.params == (index + 1)) ?  'selected' : ''}>
                        <Link href='/page/[slug]' as={`/page/${index + 1}`}>
                            <a className="link">{ index + 1 }</a>
                        </Link>
                    </PaginationItem>
                ))}
            </PaginationList>
        </PaginationWrap>
    )
}

const PaginationWrap = styled.div`
    margin: 0 auto 40px;
`;

const PaginationList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PaginationItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #2e9afe;
    width: 40px;
    height: 40px;
    border: 5px solid #2e9afe;
    border-radius: 10px;
    margin-right: 8px;
    &:last-child {
        margin-right: 0;
    }
    &.selected {
        background: #2e9afe;
        color: #fff;
    }

    .link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
`;


export default Pagination
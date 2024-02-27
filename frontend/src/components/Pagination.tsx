
type Props = {
  totalPosts: number,
  postsPerPage: number,
  setCurrentPage: (page: number) => void,
  currentPage: number
}

const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage} : Props) => {
    let pages = []

    for (let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i)
    }
  return (
    <div>
      {
        pages.map((page, idx) => {
          return <button key={idx} onClick={() => setCurrentPage(page)} className={ page == currentPage? 'active': 'bg-red-200 px-3 py-3'}>{page}</button>
        }) 
      }
    </div>
  )
}

export default Pagination

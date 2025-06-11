// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

// import React from 'react'

// type PaginationProps = {
//   page: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
// };

// export default function PaginationPage({ page, setPage }: PaginationProps) {

//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious href="#" onClick={() => setPage((page) => page > 1 ? page - 1 : 1)} />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#" isActive  onClick={() => setPage((page) => 1)}  >1</PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#" onClick={() => setPage((page) => 2)} >2</PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#" onClick={() => setPage((page) => 3)} >3</PaginationLink>
//         </PaginationItem>

//         <PaginationItem>
//           <PaginationNext onClick={() => setPage((page) => page + 1)} />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   )
// }


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import React from 'react'

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number|any;
};

export default function PaginationPage({ page, setPage, totalPages }: PaginationProps) {
  // Create array of page numbers to display
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
            // disabled={page === 1}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={page === pageNumber}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && pageNumbers.length > 5 && <PaginationEllipsis />}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : totalPages))}
            // disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

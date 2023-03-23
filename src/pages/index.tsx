import Cattle from "@/components/cattle";
import Header from "@/components/header";
import { InfiniteScroller } from "@/components/InfiniteScroller";
import logger from "@/helpers/logger";
import { getCattles } from "@/lib/getCattles";
import { ICattle } from "@/types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import { useState } from "react";

export async function getServerSideProps() {
  try {
    const cattles = await getCattles();
    return {
      props: JSON.parse(JSON.stringify(cattles)),
    };
  } catch (error) {
    logger.error({ error });
    return {
      props: { data: [], page: 0, totalCount: 0, totalPage: 0 },
    };
  }
}
export default function Home({
  data,
  page,
  totalCount,
  totalPage,
}: {
  data: ICattle[];
  page: number;
  totalCount: number;
  totalPage: number;
}) {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    page,
    totalCount,
    totalPage,
    cattles: data,
  });

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    let res = await fetch(`/api/cattles?page=${pageData.page + 1}`);
    const { page, totalCount, totalPage, data: cattles } = await res.json();
    setLoading(false);
    setPageData((prevPageData) => {
      return {
        page,
        totalCount,
        totalPage,
        cattles: [...prevPageData.cattles, ...cattles],
      };
    });
  };

  return (
    <>
      <Head>
        <title>AnimalMela</title>
        <meta
          name="description"
          content="An online market place to sell and buy animals"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <InfiniteScroller
          loadMore={loadMore}
          hasMore={pageData.page < pageData.totalPage}
        >
          <>
            <Grid container spacing={2}>
              {pageData.cattles &&
                pageData.cattles.map((cattle) => (
                  <Grid key={`${cattle.id!}-key`} item sm={12}>
                    <Cattle cattle={cattle} />
                  </Grid>
                ))}
            </Grid>
            {loading && (
              <Box sx={{ textAlign: "center", paddingTop: 2 }}>
                <CircularProgress color="inherit" />
              </Box>
            )}
          </>
        </InfiniteScroller>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 40 }}
          href="/cattle"
        >
          Sale
        </Fab>
      </main>
    </>
  );
}

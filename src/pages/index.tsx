export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/stake/stake',
    },
    props: {},
  };
}

export default function IndexPage() {
  return null;
}

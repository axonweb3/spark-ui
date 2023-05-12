export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/stake/stake',
    },
    props: {},
  };
}

export default function StakePage() {
  return null;
}


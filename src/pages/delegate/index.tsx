export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/delegate/delegate',
    },
    props: {},
  };
}

export default function DelegatePage() {
  return null;
}


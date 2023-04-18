import React from 'react';
// import { useJoyId } from '@/hooks/useJoyId';
import { useNexus } from '@/hooks/useNexus';

function Index() {
  // const { joyId, connect, connected } = useJoyId();
  const { connect } = useNexus();

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
    </div>
  );
}

export default Index;

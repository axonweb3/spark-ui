import React from 'react';
import { useJoyId } from '@/hooks/useJoyId';
import { useNexus } from '@/hooks/useNexus';

function Index() {
  const joyId = useJoyId();
  const nexus = useNexus();

  return (
    <div className="flex flex-col items-start">
      {joyId.connected ? (
        <span>JoyId Address: {joyId.address}</span>
      ) : (
        <button onClick={() => joyId.connect()}>Connect By JoyId</button>
      )}
      {nexus.connected ? (
        <span>Nexus Address: {nexus.address}</span>
      ) : (
        <button onClick={() => nexus.connect()}>Connect By Nexus</button>
      )}
    </div>
  );
}

export default Index;

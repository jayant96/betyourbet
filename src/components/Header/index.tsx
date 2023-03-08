import { useState } from "react";
import { navLinks } from "src/constants";
import ethers from "ethers";




const Header = () => {
  const [active, setActive] = useState("Home");
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // async function connectWallet(): Promise<void> {
  //   const provider = await detectEthereumProvider();
  //   if (provider) {
  //     try {
  //       // Request access to the user's accounts
  //       await provider.request({ method: 'eth_requestAccounts' });
  //       // The user has connected their wallet
  //       // You can now use the provider to interact with the blockchain
  //     } catch (error) {
  //       // The user did not connect their wallet
  //       console.error(error);
  //     }
  //   } else {
  //     // Metamask is not installed or not connected
  //     // Prompt the user to connect their wallet
  //     alert('Please install Metamask');
  //   }
  // }

  async function requestAccount() {
    console.log('Requesting account...');
    //check if metamask is installed
    if(window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.log('Error conneccting...');
    }
  }
    else {
      alert('Metamask not detected');
    }    
  }

  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
  }
}
  


  // just a random logo

  return (
    <nav className="flex w-full border-b border-gray-500 h-[80px] px-10">
      <img
        className="w-[140px] h-full"
        alt="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhXXi-2NMVgK9qenpFUpEe4r8eYqr1W8G8A&usqp=CAU"
      />
      <ul className="list-none sm:flex hidden justify-start items-center flex-1 px-10">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title
                ? "text-stone-500"
                : "text-stone-300"
            } ${
              index === navLinks.length - 1 ? "mr-0" : "mr-[30px]"
            }`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="flex justify-end items-center w-[400px]">
        <button 
        className="w-[140px] h-[40px] border-2 border-white rounded-md"
        onClick={requestAccount}>
          Connect wallet
        </button>
        <h3>Wallet Address: {walletAddress}</h3>
      </div>
    </nav>
  );
};

export default Header;

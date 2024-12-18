const ProcessHome = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-medium text-white mb-10 text-center">
        Bid and Buy{" "}
        <span className="text-color-primary">Your Favorite Jewelry</span>
      </h2>
      <div className="grid grid-cols-1 m-auto gap-5 w-full md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
          <h2 className="text-5xl font-bold text-stroke">01</h2>
          <h3 className="text-2xl font-bold">Browse Available Auctions</h3>
          <p className="text-body-text-color">
            Explore a wide range of jewelery available for bidding, from collectibles to masterpieces.
          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
          <h2 className="text-5xl font-bold text-stroke">02</h2>
          <h3 className="text-2xl font-bold">Place Your Bid</h3>
          <p className="text-body-text-color">
            Find the jewelery you're interested in, and place a competitive bid to secure your item.
          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
          <h2 className="text-5xl font-bold text-stroke">03</h2>
          <h3 className="text-2xl font-bold">Track Auction Progress</h3>
          <p className="text-body-text-color">
            Keep an eye on your bid as the auction progresses, and outbid others to increase your chances of winning.
          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg">
          <h2 className="text-5xl font-bold text-stroke">04</h2>
          <h3 className="text-2xl font-bold">Win the Auction</h3>
          <p className="text-body-text-color">
            If you place the highest bid when the auction ends, the eye catching uniques masterpiece is yours! Complete the purchase and enjoy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessHome;

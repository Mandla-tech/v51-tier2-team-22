import EachMutualGroup from "./EachMutualGroup";

function MutualGroups() {
  return (
    <article className="w-[30rem] bg-red-50 m-6 rounded-xl">
      <div className="py-3 px-4 flex justify-between">
        <p className="font-semibold">4 Mutual groups</p>
        <button className="text-primary bg-blizzard-blue px-2 py-1 rounded-md">View all</button>
      </div>

      <EachMutualGroup />
      <EachMutualGroup />
      <EachMutualGroup />
    </article>
  );
}

export default MutualGroups;

// react
import { useParams } from "react-router-dom";
import { useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { updateGroupBudget, updateGroupExpense } from "../features/groupsSlice";
import useModal from "../components/Utils/useModal";
import Modal from "../components/Utils/Modal";
// components
import GroupChart from "../components/Groups/GroupChart";
import ExpenseBar from "../components/Groups/GroupExpenseBar";
import GroupExpenseTable from "../components/Groups/GroupExpenseTable";
import GroupMembers from "../components/Groups/GroupMembers";
import GroupName from "../components/Groups/GroupName";
import GroupSmallExpenseCard from "../components/Groups/GroupSmallExpenseCard";
// icons
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Groups() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === parseInt(groupId))
  );

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();
  const [formData, setFormData] = useState({
    totalBudget: "",
    totalExpense: "",
  });

  if (!group) {
    return (
      <div className="text-header font-bold text-secondary dark:text-dark-text">
        Group not found
      </div>
    );
  }

  const handleEditClick = () => {
    setFormData({
      totalBudget: "",
      totalExpense: "",
    });
    openModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateGroupBudget({
        groupId: parseInt(groupId),
        totalBudget: parseFloat(formData.totalBudget),
      })
    );
    dispatch(
      updateGroupExpense({
        groupId: parseInt(groupId),
        totalExpense: parseFloat(formData.totalExpense),
      })
    );
    setFormData({
      totalBudget: "",
      totalExpense: "",
    });

    toast.success(`Budget and expense updated`, {
      position: "top-right",
      autoClose: 2000,
    });

    closeModal();
  };

  const totalBudget = group.totalBudget;
  const totalExpense = group.totalExpense;
  const remainingBudget = totalBudget - totalExpense;

  return (
    <section className="flex flex-col gap-8 m-6">
      <GroupName groupName={group.name} />

      <div className="flex gap-6 flex-col xl:flex-row">
        <GroupSmallExpenseCard
          icon={GiMoneyStack}
          label="Total budget"
          value={`${totalBudget}`}
          button="Edit"
          onClick={handleEditClick}
        />
        <GroupSmallExpenseCard
          icon={MdOutlineShoppingCart}
          label="Total expense"
          value={`${totalExpense}`}
        />
        <GroupSmallExpenseCard
          icon={LiaMoneyBillWaveAltSolid}
          label="Remaining budget"
          value={`${remainingBudget}`}
        />
      </div>

      <ExpenseBar expense={totalExpense} budget={totalBudget} />
      <GroupChart groupId={groupId} />
      <GroupMembers members={group.members} />
      <GroupExpenseTable />

      {isOpen && (
        <Modal
          content={
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-body font-semibold dark:text-dark-text">
                  Budget
                </label>

                <input
                  type="number"
                  name="totalBudget"
                  value={formData.totalBudget}
                  onChange={handleInputChange}
                  className="border p-2 w-full dark:bg-dark-input"
                  placeholder="Enter member name"
                  required
                />
              </div>

              <div>
                <label className="text-body font-semibold dark:text-dark-text">
                  Expense
                </label>

                <input
                  type="number"
                  name="totalExpense"
                  value={formData.totalExpense}
                  onChange={handleInputChange}
                  className="border p-2 w-full dark:bg-dark-input"
                  placeholder="Enter member number"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-xl dark:bg-dark-primary"
              >
                Update
              </button>
            </form>
          }
          onClose={closeModal} // Close modal when clicking close button or outside the modal
          handleClickOutside={handleClickOutside} // Close modal when clicking outside
        />
      )}
    </section>
  );
}

export default Groups;

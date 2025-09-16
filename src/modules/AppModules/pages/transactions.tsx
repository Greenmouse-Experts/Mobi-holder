import { useQuery } from "@tanstack/react-query";
import apiClient, { newClient } from "../../../api/apiFactory";
import { useMemo, useState, useEffect } from "react";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
// import { getTransactions } from '../../services/transactions';
interface Plan {
  id: number;
  name: string;
  price: string;
  validity: number;
  description: string;
}

interface PaystackResponse {
  amount: number;
  paidAt: string;
  status: string;
  channel: string;
  currency: string;
  customer: string;
  reference: string;
}

interface Individual {
  isVerified: boolean;
  id: string;
  mobiHolderId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  companyName: string | null;
  companyAddress: string | null;
  companyEmail: string | null;
  aboutCompany: string | null;
  natureOfOrganization: string | null;
  isSuperAdmin: boolean;
  accountType: string;
  acceptedTnC: boolean;
  photo: string | null;
  wallet: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  individualId: string;
  organizationId: string;
  subscriptionId: number;
  plan: Plan;
  amount: string;
  paystackResponse: PaystackResponse;
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  individual: Individual;
}

export interface TransactionsResponse {
  code: number;
  message: string;
  data: Transaction[];
}
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function UserTransactions() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);
  const user = useSelector((state) => state.userData.data);

  const query = useQuery<TransactionsResponse>({
    queryKey: ["transactions", debouncedSearch],
    queryFn: async () => {
      let resp = await newClient.get(
        "/api/memberships-subscriptions/get/individual/transactions",
        {
          params: {
            searchParam: debouncedSearch.trim(),
          },
        },
      );
      return resp.data;
    },
  });

  // No need to filter client-side, as search is now a param to the query
  const filteredTransactions = useMemo(() => {
    if (!query.data?.data) return [];
    return query.data.data;
  }, [query.data]);
  if (query.isError) {
    return (
      <>
        <Header data={user} title={"Designation"} />
        <div className="flex flex-col items-center justify-center mt-8 p-4 min-h-[520px] rounded-lg shadow-md">
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <p className="text-red-700 text-center font-semibold">
              An error occurred!
            </p>
          </div>
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
            onClick={() => query.refetch()}
          >
            Try Again
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="p-6 w-full mx-auto">
      <div className="mb-4">
        <Header mobile data={user} title={"Transactions"} />
      </div>
      {/*<h1 className="text-2xl font-bold mb-4 mt-6">Transactions</h1>*/}
      {/*<div className="mb-6">
        <input
          type="text"
          className="w-full px-4 bg-white font-semibold py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by name, email, plan, or reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>*/}
      {query.isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : query.isError ? (
        <div className="text-center py-10 text-red-500">
          Error loading transactions.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Plan</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Reference</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tx.individual?.firstName} {tx.individual?.lastName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tx.individual?.email}
                    </td>
                    <td className="py-2 px-4 border-b">{tx.plan?.name}</td>
                    <td className="py-2 px-4 border-b">{tx.amount}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={
                          tx.status === "success"
                            ? "text-green-600 font-semibold"
                            : tx.status === "failed"
                              ? "text-red-600 font-semibold"
                              : "text-gray-700"
                        }
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">{tx.reference}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

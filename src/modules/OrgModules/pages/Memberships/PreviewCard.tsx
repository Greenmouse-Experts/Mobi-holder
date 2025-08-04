import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { newApi } from "../../../../api/hooks/useApiMutation";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { Eye, X, Download, FileText } from "lucide-react"; // Import Lucide icons
import { usePDF } from "react-to-pdf";

interface API_RESPONSE {
  code: number;
  data: IDCard;
  message: string;
}
export interface ScanIDCard {
  frontIdCard: string;
  backIdCard: string;
}

export interface IDCard {
  id: string;
  cardNumber: string;
  individualId: string;
  designation: string;
  issuingOrganization: string;
  issuedDate: string; // ISO date string
  expiryDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  scanIDCard: ScanIDCard;
}

export default function PreviewCard() {
  const { id } = useParams();
  const user = useSelector((state) => state.userData.data);
  const [modalImage, setModalImage] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const exportContentRef = useRef<HTMLDivElement>(null);

  const { toPDF, targetRef } = usePDF({
    filename: `id-card-${id}.pdf`,
    page: {
      margin: 20,
      format: "a4",
    },
  });

  const {
    data: cardData,
    isLoading,
    isError,
    error,
  } = useQuery<API_RESPONSE>({
    queryKey: [id, "card"],
    queryFn: async () => {
      let resp = await newApi.get(`/api/idcards/personal/card?id=${id}`);
      console.log(resp.data);
      return resp.data;
    },
  });

  const openModal = (src: string, title: string) => {
    setModalImage({ src, title });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const openExportModal = () => {
    setShowExportModal(true);
  };

  const closeExportModal = () => {
    setShowExportModal(false);
  };

  const handleExportPDF = () => {
    toPDF();
    setShowExportModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading ID card details...</p>
        <p className="text-sm text-center">
          Please wait while we fetch the card information.
        </p>
      </div>
    );
  }

  if (isError || !cardData?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600 bg-red-50 rounded-lg p-6 m-6 border border-red-200 shadow-md">
        <X className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-center">
          Failed to Load Card Details
        </h2>
        <p className="text-lg text-center mb-4">
          We couldn't retrieve the ID card information.
        </p>
        <p className="text-sm text-gray-600 text-center">
          {error?.response?.data?.message ?? (
            <>
              This might be due to a network issue, or the card ID is invalid.
              Please check your connection or try again.
            </>
          )}
        </p>
      </div>
    );
  }

  const card = cardData.data;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div>
        <Header mobile data={user} title={"View ID Card"} />
      </div>

      {/* Export Button */}
      <div className="flex justify-end mb-6 mt-12">
        <button
          onClick={openExportModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </div>

      {/* Card Details */}
      <div className="bg-mobiDarkCloud rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Card Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium ">Card Number</label>
            <p className="mt-1 text-sm ">{card.cardNumber}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Individual ID
            </label>
            <p className="mt-1 text-sm ">{card.individualId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <p className="mt-1 text-sm ">{card.designation}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issuing Organization
            </label>
            <p className="mt-1 text-sm ">{card.issuingOrganization}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issued Date
            </label>
            <p className="mt-1 text-sm ">
              {new Date(card.issuedDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <p className="mt-1 text-sm ">
              {new Date(card.expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* ID Card Images */}
      <div className="bg-mobiDarkCloud rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">ID Card Images</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Front ID Card */}
          <div>
            <h3 className="text-lg font-medium mb-3">Front ID Card</h3>
            <div
              className="border rounded-lg overflow-hidden cursor-pointer"
              onClick={() =>
                openModal(card.scanIDCard.frontIdCard, "Front ID Card")
              }
            >
              <img
                src={card.scanIDCard.frontIdCard}
                alt="Front ID Card"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5Y2EzYWYiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+";
                }}
              />
            </div>
          </div>

          {/* Back ID Card */}
          <div>
            <h3 className="text-lg font-medium mb-3">Back ID Card</h3>
            <div
              className="border rounded-lg overflow-hidden cursor-pointer"
              onClick={() =>
                openModal(card.scanIDCard.backIdCard, "Back ID Card")
              }
            >
              <img
                src={card.scanIDCard.backIdCard}
                alt="Back ID Card"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5Y2EzYWYiPkltYWdlIG5vdCBhdmFpbGFibGU8L2RldHREPgPC9zdmc+";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden PDF Content */}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <div
          ref={targetRef}
          className="p-8 bg-white"
          style={{ width: "794px" }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ID Card Details
            </h1>
            <p className="text-gray-600">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Card Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <p className="mt-1 text-sm text-gray-900">{card.cardNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Individual ID
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {card.individualId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <p className="mt-1 text-sm text-gray-900">{card.designation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issuing Organization
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {card.issuingOrganization}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issued Date
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(card.issuedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(card.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              ID Card Images
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                  Front ID Card
                </h3>
                <img
                  src={card.scanIDCard.frontIdCard}
                  alt="Front ID Card"
                  className="max-w-full h-auto border rounded-lg"
                  style={{ maxHeight: "300px" }}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                  Back ID Card
                </h3>
                <img
                  src={card.scanIDCard.backIdCard}
                  alt="Back ID Card"
                  className="max-w-full h-auto border rounded-lg"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeExportModal}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Export ID Card
              </h3>
              <button
                onClick={closeExportModal}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 group"
              >
                <X className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Export the ID card details and images as a PDF document. This
                will include all card information and both front and back
                images.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-2">
                  Export will include:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Card details and information</li>
                  <li>• Front ID card image</li>
                  <li>• Back ID card image</li>
                  <li>• Export timestamp</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeExportModal}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl w-full max-h-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Eye className="w-6 h-6" />{" "}
                {/* Replaced SVG with Lucide Eye icon */}
                {modalImage.title}
              </h3>
              <button
                onClick={closeModal}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 group"
              >
                <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />{" "}
                {/* Replaced SVG with Lucide X icon */}
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 bg-gray-50 flex items-center justify-center min-h-[60vh]">
              <div className="relative bg-white rounded-xl shadow-lg p-4 max-w-full max-h-full">
                <img
                  src={modalImage.src}
                  alt={modalImage.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5Y2EzYWYiPkltYWdlIG5vdCBhdmFpbGFibGU8L2RldHREPgPC9zdmc+";
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-100 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Click outside or press ESC to close
              </p>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />{" "}
                {/* Replaced SVG with Lucide X icon */}
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useSavedItemsStore } from "@/store/useSavedItemsStore";
import { format } from "date-fns";
import AttractionComboBox from "@/components/common/AttractionComboBox";
import { searchActivityApi } from "@/api/activityApi";
import type { Attraction } from "@/api/activityApi";
import DatePicker from "@/components/common/DatePicker";

const Activities = () => {
  const [formData, setFormData] = useState<{
    attraction: Attraction | null;
    activityDate: Date | undefined;
  }>({
    attraction: null,
    activityDate: undefined,
  });

  const mutation = useMutation({
    mutationFn: (params: {
      id: string;
      activityDate: Date | string;
    }) => searchActivityApi(params.id),
    onSuccess: (response) => {
      console.log("Search results:", response.data);
      toast.success("Activity search successful! Check console for results.");
    },
    onError: (error) => {
      console.error("Error searching activities:", error);
      toast.error("Failed to search activities. Please try again.");
    },
  });

  const addActivity = useSavedItemsStore((s) => s.addActivity);
  const removeActivity = useSavedItemsStore((s) => s.removeActivity);
  const savedActivities = useSavedItemsStore((s) => s.activities);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.attraction?.id || !formData.activityDate) {
      toast.error("Please fill in all required fields");
      return;
    } else {
      mutation.mutate({
        id: formData.attraction?.id,
        activityDate: format(formData.activityDate, "yyyy-MM-dd"),
      });
    }
  };

  console.log("form-data", formData);

  return (
    <div className="w-full">
      <div className="bg-white shadow rounded-md w-full h-fit p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl text-black font-semibold mb-4 lg:mb-5">
          Activities Search
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-6">
          <div>
            <AttractionComboBox
              placeholder="Search for an activity"
              value={formData.attraction ?? undefined}
              onSelect={(activity) =>
                setFormData((prev) => ({ ...prev, attraction: activity }))
              }
            />
          </div>

          <div>
            <p className="mb-2 font-medium text-sm lg:text-base">
              Choose date:
            </p>
            <DatePicker
              onSelect={(activityDate) =>
                setFormData((prev) => ({ ...prev, activityDate }))
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              mutation.isPending ||
              !formData.attraction?.id ||
              !formData.activityDate 
            }
          >
            {mutation.isPending ? "Searching..." : "Search Activities"}
          </Button>
        </form>
      </div>
      <div className="mt-4 lg:mt-6 space-y-3">
        {mutation.data &&
          Array.isArray(mutation.data.data.products) &&
          mutation.data.data.products.map((activity: any) => {
            const { id, title, cityName, countryCode, price, reviewScore } =
              activity;

            return (
              <div
                key={id}
                className="border border-gray-200 p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">
                    {cityName}, {countryCode}
                  </p>
                  {reviewScore && (
                    <p className="text-xs text-yellow-500">
                      ⭐ {reviewScore} / 5
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">
                    {price?.currency} {price?.value.toFixed(2)}
                  </p>
                  {savedActivities.some((a) => a.id === id) ? (
                    <Button
                      variant="destructive"
                      onClick={() => removeActivity(id)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addActivity({ id, data: activity })}
                      className="mt-2"
                    >
                      Save
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Activities;

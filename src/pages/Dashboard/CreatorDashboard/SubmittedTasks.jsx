import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SubmittedTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch creator's contests
  const { data: contests = [], isLoading: contestsLoading } = useQuery({
    queryKey: ["creatorContests", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get("/creator/contests");
      return res.data;
    },
  });

  // Fetch all submissions for creator's contests
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["creatorSubmissions", contests],
    queryFn: async () => {
      if (contests.length === 0) return [];
      const contestIds = contests.map((c) => c._id);
      const res = await axiosSecure.post("/creator/submissions", {
        contestIds,
      });
      return res.data;
    },
    enabled: contests.length > 0,
  });

  const declareWinnerMutation = useMutation({
    mutationFn: async ({
      contestId,
      winnerUid,
      winnerName,
      winnerPhotoURL,
    }) => {
      await axiosSecure.patch(`/contests/${contestId}/winner`, {
        winner: {
          uid: winnerUid,
          name: winnerName,
          photoURL: winnerPhotoURL,
        },
      });
    },
    onSuccess: (_, variables) => {
      // Optimistic update: instantly show winner in UI
      queryClient.setQueryData(["creatorContests"], (old) =>
        old.map((c) =>
          c._id === variables.contestId
            ? {
                ...c,
                winner: {
                  uid: variables.winnerUid,
                  name: variables.winnerName,
                  photoURL: variables.winnerPhotoURL,
                },
              }
            : c
        )
      );

      queryClient.invalidateQueries(["creatorContests"]);
      queryClient.invalidateQueries(["creatorSubmissions"]);
      Swal.fire(
        "Winner Declared!",
        "The winner has been announced.",
        "success"
      );
      setSelectedSubmission(null);
    },
    onError: () => {
      Swal.fire("Error", "Failed to declare winner", "error");
    },
  });

  const handleDeclareWinner = (submission) => {
    const contest = contests.find((c) => c._id === submission.contestId);
    if (contest.winner) {
      Swal.fire(
        "Already Declared",
        "A winner has already been declared.",
        "info"
      );
      return;
    }

    Swal.fire({
      title: "Declare Winner?",
      text: `Declare ${submission.userName} as winner of "${contest.name}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, declare winner!",
    }).then((result) => {
      if (result.isConfirmed) {
        declareWinnerMutation.mutate({
          contestId: submission.contestId,
          winnerUid: submission.userUid,
          winnerName: submission.userName,
          winnerPhotoURL:
            submission.userPhotoURL || "https://i.ibb.co/4pB0Z4J/user.png",
        });
      }
    });
  };

  if (contestsLoading || submissionsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Submitted Tasks</h2>

      {submissions.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <span>No submissions yet. Waiting for participants!</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((submission) => {
            const contest = contests.find(
              (c) => c._id === submission.contestId
            );
            return (
              <div key={submission._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg">{contest?.name}</h3>
                  <p className="text-sm text-base-content/70">
                    Participant: {submission.userName || submission.userEmail}
                  </p>
                  <p className="text-sm">
                    Submitted:{" "}
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="btn btn-primary btn-sm"
                    >
                      View Submission
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Submission Details</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Contest:</p>
                <p>
                  {
                    contests.find((c) => c._id === selectedSubmission.contestId)
                      ?.name
                  }
                </p>
              </div>
              <div>
                <p className="font-semibold">Participant:</p>
                <p>
                  {selectedSubmission.userName || selectedSubmission.userEmail}
                </p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedSubmission.userEmail}</p>
              </div>
              <div>
                <p className="font-semibold">Submitted Task:</p>
                <div className="bg-base-200 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedSubmission.task}
                </div>
              </div>
              <div>
                <p className="font-semibold">Submitted At:</p>
                <p>
                  {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              {!contests.find((c) => c._id === selectedSubmission.contestId)
                ?.winner && (
                <button
                  onClick={() => handleDeclareWinner(selectedSubmission)}
                  className="btn btn-success"
                >
                  Declare Winner
                </button>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedSubmission(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default SubmittedTasks;

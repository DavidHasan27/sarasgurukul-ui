import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faCalendarDay,
  faChartColumn,
  faEnvelope,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import ParentLayout from "../../component/app-component/Parent";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  clearDashboardError,
  fetchDashboardData,
} from "../../redux/dashboard/dashboardSlice";
import { getFormattedfee } from "../../utils";

/** Resolves photo URLs (S3 bucket|key or absolute URL) used elsewhere in the app. */
function resolveImageUrl(photo?: string | null) {
  if (!photo) return "/img/app/user.png";
  const trimmed = String(photo).trim();
  if (!trimmed) return "/img/app/user.png";
  if (trimmed.includes("|")) {
    const parts = trimmed.split("|");
    if (parts.length >= 2) {
      return `https://${parts[0]}.s3.ap-south-1.amazonaws.com/${parts[1]}`;
    }
  }
  if (trimmed.startsWith("http")) return trimmed;
  return "/img/app/user.png";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, data } = useAppSelector((state: any) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const newCount = data?.newStudentsLastFiveDays?.length ?? 0;
  const overdueCount = data?.overdueFees?.length ?? 0;
  const chartMax = Math.max(newCount, 1);

  const overviewSubtitle = useMemo(() => {
    if (data?.today) return data.today;
    return "Overview for your school";
  }, [data?.today]);

  return (
    <ParentLayout
      loading={loading}
      error={error}
      onCloseAlert={() => dispatch(clearDashboardError())}
    >
      <div className="w-full min-h-0 overflow-x-hidden border-t bg-gray-50">
        <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
          <div className="mb-6">
            <Typography
              variant="h3"
              className="font-semibold text-gray-900"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Dashboard
            </Typography>
            <Typography
              className="mt-1 text-gray-600"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {overviewSubtitle}
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
            {/* Today — special days + birthdays */}
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#193474]">
                <FontAwesomeIcon icon={faCalendarDay} className="text-xl" />
                <Typography
                  className="text-lg font-semibold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Today
                </Typography>
              </div>

              {data?.specialDays && data.specialDays.length > 0 ? (
                <div className="mb-4 space-y-2">
                  {data.specialDays.map((d: any) => (
                    <div
                      key={d.id}
                      className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-900"
                    >
                      <div className="font-medium">{d.specialDay}</div>
                      {d.eventDate && (
                        <div className="text-xs text-blue-800/80">{d.eventDate}</div>
                      )}
                      {d.celebration && (
                        <div className="mt-1 text-blue-900">
                          <span className="font-medium">Celebration: </span>
                          {d.celebration}
                        </div>
                      )}
                      {d.message && (
                        <div className="mt-1 text-blue-900/90">{d.message}</div>
                      )}
                      {d.category && (
                        <div className="mt-1 text-xs text-blue-800/70">
                          {d.category}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mb-4 text-sm text-gray-500">
                  No special day events for this period.
                </p>
              )}

              <div className="mb-2 flex items-center gap-2 text-gray-800">
                <FontAwesomeIcon icon={faBirthdayCake} className="text-pink-500" />
                <span className="font-medium">Birthdays today</span>
              </div>

              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Students
              </div>
              <div className="mb-4 min-h-[48px] space-y-2">
                {data?.studentBirthdays && data.studentBirthdays.length > 0 ? (
                  data.studentBirthdays.map((s: any) => (
                    <div
                      key={s.studentId}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/80 px-2 py-1.5"
                    >
                      <img
                        src={resolveImageUrl(s.studentPhoto)}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {s.fullName}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No student birthdays today.</p>
                )}
              </div>

              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Staff
              </div>
              <div className="min-h-[48px] grow space-y-2">
                {data?.staffBirthdays && data.staffBirthdays.length > 0 ? (
                  data.staffBirthdays.map((s: any) => (
                    <div
                      key={s.userId}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/80 px-2 py-1.5"
                    >
                      <img
                        src={resolveImageUrl(s.profilePhoto)}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-700">
                          {s.fullName}
                        </div>
                        {s.roleName && (
                          <div className="truncate text-xs text-gray-500">{s.roleName}</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No staff birthdays today.</p>
                )}
              </div>
            </div>

            {/* New students — last 5 days */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-[#193474]">
                <FontAwesomeIcon icon={faChartColumn} className="text-xl" />
                <Typography
                  className="text-lg font-semibold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  New students (last 5 days)
                </Typography>
              </div>
              <p className="mb-4 text-xs text-gray-500">
                Students who joined in the last five days.
              </p>
              <div className="flex h-44 items-end justify-around gap-6 border-b border-gray-200 px-2">
                <div className="flex h-full w-full max-w-[120px] flex-col items-center justify-end">
                  <div
                    className="w-full max-w-[72px] rounded-t-md bg-gradient-to-t from-[#193474] to-[#3d68ff] transition-all"
                    style={{
                      height: `${Math.max(8, (newCount / chartMax) * 100)}%`,
                      minHeight: newCount === 0 ? "8px" : undefined,
                    }}
                  />
                  <span className="mt-2 text-2xl font-semibold text-gray-800">
                    {newCount}
                  </span>
                  <span className="mt-1 text-xs text-gray-500">New</span>
                </div>
              </div>
              <div className="mt-4 max-h-48 space-y-2 overflow-y-auto">
                {data?.newStudentsLastFiveDays &&
                data.newStudentsLastFiveDays.length > 0 ? (
                  data.newStudentsLastFiveDays.map((s: any) => (
                    <div
                      key={s.studentId}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 px-2 py-2"
                    >
                      <img
                        src={resolveImageUrl(s.studentPhoto)}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-gray-800">
                          {s.fullName}
                        </div>
                        <div className="truncate text-xs text-gray-500">
                          {s.className}
                          {s.joiningDate ? ` · ${s.joiningDate}` : ""}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No new students in this window.</p>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#193474]">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                  <Typography
                    className="text-lg font-semibold"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Messages
                  </Typography>
                </div>
              </div>
              <p className="mb-4 grow text-sm text-gray-500">
                View notices and notifications sent to your school.
              </p>
              <Button
                size="sm"
                className="w-full bg-[#193474]"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={() => navigate("/app/messages")}
              >
                Open inbox
              </Button>
            </div>

            {/* Overdue fees */}
            <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#193474]">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="text-xl text-amber-600"
                />
                <Typography
                  className="text-lg font-semibold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Fee follow-up
                </Typography>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Students with unpaid installments after the due date.
              </p>
              <div className="mb-3 text-4xl font-bold text-gray-800">{overdueCount}</div>
              <p className="mb-4 text-xs text-gray-400">Overdue installments listed below.</p>
              <div className="mb-4 max-h-52 overflow-y-auto rounded-lg border border-gray-100">
                {data?.overdueFees && data.overdueFees.length > 0 ? (
                  <table className="w-full min-w-0 text-left text-xs">
                    <thead className="sticky top-0 bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-2 py-2 font-medium">Student</th>
                        <th className="px-2 py-2 font-medium">Due</th>
                        <th className="px-2 py-2 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.overdueFees.map((row: any) => (
                        <tr key={`${row.studentId}-${row.installmentLabel}-${row.dueDate}`}>
                          <td className="px-2 py-2 align-top">
                            <div className="font-medium text-gray-800">{row.studentName}</div>
                            <div className="text-gray-500">{row.className}</div>
                            <div className="text-gray-500">{row.feeTypeName}</div>
                            <div className="text-gray-400">{row.installmentLabel}</div>
                          </td>
                          <td className="px-2 py-2 align-top text-gray-600">{row.dueDate}</td>
                          <td className="px-2 py-2 align-top text-right font-medium text-gray-800">
                            ₹{getFormattedfee(row.amountDue ?? 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="p-4 text-sm text-gray-400 italic">No overdue fees right now.</p>
                )}
              </div>
              <div className="mt-auto flex flex-row gap-2">
                <Button
                  size="sm"
                  variant="outlined"
                  className="flex-1"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => navigate("/app/students")}
                >
                  Students
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-[#193474]"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => navigate("/app/studentFee")}
                >
                  Student fee
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ParentLayout>
  );
};

export default Dashboard;

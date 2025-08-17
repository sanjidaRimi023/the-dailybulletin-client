import { useEffect } from "react";
import Swal from "sweetalert2";
import useCurrentUser from "../../Hooks/useCurrentUser";

const PremiumPrompt = () => {
  const [userInfo, loading] = useCurrentUser();

  useEffect(() => {
    const isPremiumExpired = () => {
      if (!userInfo?.premiumExpiresAt) return true;
      const now = new Date();
      const expiry = new Date(userInfo.premiumExpiresAt);
      return now > expiry;
    };

    if (
      !loading &&
      userInfo &&
      (userInfo.isPremium !== true || isPremiumExpired())
    ) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem("promptShown")) {
          Swal.fire({
            title: "Become a Premium Member!",
            text: "Subscribe now to access premium articles.",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Subscribe Now",
            cancelButtonText: "Maybe Later",
            confirmButtonColor: "#4f46e5",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = "/subscription";
            }
          });

          localStorage.setItem("promptShown", "true");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [userInfo, loading]);
};
export default PremiumPrompt;

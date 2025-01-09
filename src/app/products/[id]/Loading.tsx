import { Skeleton, SVGSkeleton } from "@/components/Loaders/Skeleton";

const Loading = () => (
  <>
    <div className="w-full mt-50 bg-red-400">
      <div className="space-x-2 flex max-sm:mb-5 items-center">
        <a>
          <Skeleton className="w-[32px] max-w-full" />
        </a>
        <div className="pt-0.5">
          <SVGSkeleton className="w-[13px] h-[13px]" />
        </div>
        <h1 className="text-yellow-400">
          <Skeleton className="w-[128px] max-w-full" />
        </h1>
      </div>
      <div className="p-0 w-full md:p-4 lg:p-8">
        <div className="w-full max-w-[1500px] md:p-2 border-2 border-white shadow-sm mx-auto">
          <div className="flex py-6 flex-col lg:flex-row">
            <div className="w-[60%]  relative mb-4   mx-auto md:w-[40%] lg:p-10">
              <SVGSkeleton className="rounded-2xl w-full " />
            </div>
            <div className="mt-2 text-left p-2 sm:ml-10 flex flex-col lg:p-10 flex-1 justify-between">
              <div>
                <div>
                  <h1 className="lg:text-left">
                    <Skeleton className="w-[128px] max-w-full" />
                  </h1>
                  <p className="lg:text-left mb-3">
                    <Skeleton className="w-[592px] max-w-full" />
                  </p>
                </div>
              </div>
              <div className="flex gap-6 flex-col lg:flex-row">
                <div className="flex gap-1 items-center justify-center">
                  <div className="pb-1 h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center">
                    <Skeleton className="w-[14px] max-w-full" />
                  </div>
                  <p className="flex-1 sm:flex-[0.5] flex justify-center h-10 md:h-12 border-[1px] px-4 border-gray-300 md:px-6 md:py-1">
                    <Skeleton className="w-[14px] max-w-full" />
                  </p>
                  <div className="pb-1 h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center">
                    <Skeleton className="w-[14px] max-w-full" />
                  </div>
                </div>
                <div className="flex justify-between md:px-5 md:gap-10 items-center mx-auto py-3 ml-auto hover:bg-yellow-400 md:w-[80%] lg:w-[60%] mt-1 mb-1 w-full px-5">
                  <h3>
                    <Skeleton className="w-[24px] max-w-full" />
                  </h3>
                  <div>
                    <Skeleton className="w-[88px] max-w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Loading;

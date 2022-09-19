import React from "react";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import DoctorApi, {
  AddDoctorApiRequest,
  AddDoctorApiResponse,
  GetDoctorApiRequest,
  GetDoctorApiResponse,
  GetDoctorsApiRequest,
  GetDoctorsApiResponse,
  RemoveDoctorApiRequest,
  RemoveDoctorApiResponse,
} from "./doctor.api";

const queryKeys = {
  all: ["doctors"] as const,
  list: () => [...queryKeys.all, "list"] as const,
  detail: (id: number) => [...queryKeys.all, "detail", id] as const,
};

export type UseDoctorsParams = GetDoctorsApiRequest;
export type UseDoctorsResults = GetDoctorsApiResponse;

function useDoctors<TFnData, TError, TData>(
  params: UseDoctorsParams,
  options?: UseQueryOptions<UseDoctorsResults, TError, TData>
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<UseDoctorsResults, TError, TData>(
    queryKeys.list(),
    () => {
      const getDoctorsRequest: GetDoctorsApiRequest = params;
      return DoctorApi.getDoctors(getDoctorsRequest);
    },
    options
  );
}

export type UseDoctorParams = GetDoctorApiRequest;
export type UseDoctorResults = GetDoctorApiResponse;

function useDoctor<TFnData, TError, TData>(
  params: UseDoctorParams,
  options?: UseQueryOptions<UseDoctorResults, TError, TData>
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<UseDoctorResults, TError, TData>(
    queryKeys.detail(params.id),
    () => {
      const getDoctorRequest: GetDoctorApiRequest = params;
      return DoctorApi.getDoctor(getDoctorRequest);
    },
    options
  );
}

export type UseAddDoctorParams = AddDoctorApiRequest;
export type UseAddDoctorResult = AddDoctorApiResponse;

function useAddDoctor<TData, TError>(
  options?: UseMutationOptions<UseAddDoctorResult, TError, UseAddDoctorParams>
) {
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<UseAddDoctorResult, TError, UseAddDoctorParams>(
    (params) => {
      const addPostRequest: AddDoctorApiRequest = params;
      return DoctorApi.addDoctor(addPostRequest);
    },
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.all);
      },
    }
  );
}

export type UseRemoveDoctorParams = RemoveDoctorApiRequest;
export type UseRemoveDoctorResult = RemoveDoctorApiResponse;

function useRemoveDoctor<TData, TError>(
  options?: UseMutationOptions<
    UseRemoveDoctorResult,
    TError,
    UseRemoveDoctorParams
  >
) {
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<UseRemoveDoctorResult, TError, UseRemoveDoctorParams>(
    (params) => {
      const removePostRequest: RemoveDoctorApiRequest = params;
      return DoctorApi.removeDoctor(removePostRequest);
    },
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.all);
      },
    }
  );
}

const DoctorRepository = {
  useDoctors,
  useDoctor,
  useAddDoctor,
  useRemoveDoctor,
  queryKeys,
};

export default DoctorRepository;

"use client";
import { IFormProps } from "@/shared/model";
import { Modal } from "@/shared/components/modal";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { TanetInput, TanetSelectTreeCheck, TanetCheckbox, TanetTextArea, TanetSelect, SelectAsync, TanetFormDate, TanetCKEditor, UploadFile } from "@/lib";
import { useEffect, useState,useReducer } from "react";
import { array, number, object, ref, string,date } from "yup";
import { hiNhaServices } from "../services";
import { formReducer,INITIAL_STATE_FORM,computedTitle } from "@/lib/common";
export default function HiNhaForm({
  show,
  action,
  id,
  onClose,
}: IFormProps) {
  const titleTable="Biến động tài sản nhà";  
  const dataDefault = {
        hiNhaId: '',
    taiSanId: null,
    donViId: null,
    maDonVi: '',
    phongBanChiuPhiId: null,
    phongBanQuanLyId: null,
    soTheTaiSan: '',
    tenTaiSan: '',
    loaiTaiSanId: null,
    nhomTaiSanId: null,
    maNhomTaiSan: '',
    ngayNhapThongTin: null,
    ngaySuDung: null,
    ngaySuDungTruoc: null,
    maDiaBan: null,
    diaChi: '',
    maMucDich: null,
    maNguonGoc: null,
    trangThaiSuDung: null,
    nguyenGia: null,
    nguyenGiaTangGiam: null,
    giaTriConLai: null,
    giaTriConLaiTG: null,
    giaTriKhauHao: null,
    giaTriKhauHaoTG: null,
    thoiGianKhauHao: null,
    thoiGianKhauHaoTG: null,
    dienTichXayDung: null,
    dienTichXayDungTG: null,
    dienTichSanXd: null,
    dienTichSanXdTG: null,
    soTang: null,
    soTangTG: null,
    htCoSoSxKd: null,
    htCoSoSxKdTG: null,
    htLamNhaO: null,
    htLamNhaOTG: null,
    htChoThue: null,
    htChoThueTG: null,
    htBoTrong: null,
    htBoTrongTG: null,
    htBiLanChiem: null,
    htBiLanChiemTG: null,
    htKhac: null,
    htKhacTG: null,
    tinhTrangPasx: null,
    pasxDuocDuyet: null,
    matTien: null,
    chieuSau: null,
    capCongTrinh: null,
    ghiChu: '',
    donViNhanDcId: null,
    hinhThucThanhLy: null,
    thuTuGiam: null,
    chiPhiGiam: null,
    ngayBienDong: null,
    lyDoBienDong: null,
    laDcNguyenGia: false,
    laDcNgayDuaVaoSd: false,
    laDcKhauHao: false,
    laDcThoiGianKh: false,
    laDCNhomTaiSan: false,
    laThayDoiThongTin: false,
    trangThaiBienDong: null,
    loaiDieuChinhThongTin: null,
    loaiBienDong: null,
    loaiTaiSanGoc: null,
    laBienDongCuoi: false,
    thuTuBienDong: null,
  };
  const schema = object({
        hiNhaId: string().trim().nullable().required('ID không được để trống'),
    taiSanId: number().nullable().required('Mã tài sản id không được để trống'),
    donViId: number().nullable(),
    maDonVi: string().trim().nullable().max(250, 'Bạn nhập tối đa 250 ký tự'),
    phongBanChiuPhiId: number().nullable(),
    phongBanQuanLyId: number().nullable(),
    soTheTaiSan: string().trim().nullable().max(250, 'Bạn nhập tối đa 250 ký tự'),
    tenTaiSan: string().trim().nullable().max(1000, 'Bạn nhập tối đa 1000 ký tự'),
    loaiTaiSanId: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    nhomTaiSanId: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    maNhomTaiSan: string().trim().nullable().max(250, 'Bạn nhập tối đa 250 ký tự'),
    ngayNhapThongTin: date().nullable(),
    ngaySuDung: date().nullable(),
    ngaySuDungTruoc: date().nullable(),
    maDiaBan: number().nullable(),
    diaChi: string().trim().nullable().max(1000, 'Bạn nhập tối đa 1000 ký tự'),
    maMucDich: number().nullable(),
    maNguonGoc: number().nullable(),
    trangThaiSuDung: number().nullable(),
    nguyenGia: number().nullable(),
    nguyenGiaTangGiam: number().nullable(),
    giaTriConLai: number().nullable(),
    giaTriConLaiTG: number().nullable(),
    giaTriKhauHao: number().nullable(),
    giaTriKhauHaoTG: number().nullable(),
    thoiGianKhauHao: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    thoiGianKhauHaoTG: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    dienTichXayDung: number().nullable(),
    dienTichXayDungTG: number().nullable(),
    dienTichSanXd: number().nullable(),
    dienTichSanXdTG: number().nullable(),
    soTang: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    soTangTG: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    htCoSoSxKd: number().nullable(),
    htCoSoSxKdTG: number().nullable(),
    htLamNhaO: number().nullable(),
    htLamNhaOTG: number().nullable(),
    htChoThue: number().nullable(),
    htChoThueTG: number().nullable(),
    htBoTrong: number().nullable(),
    htBoTrongTG: number().nullable(),
    htBiLanChiem: number().nullable(),
    htBiLanChiemTG: number().nullable(),
    htKhac: number().nullable(),
    htKhacTG: number().nullable(),
    tinhTrangPasx: number().nullable(),
    pasxDuocDuyet: number().nullable(),
    matTien: number().nullable(),
    chieuSau: number().nullable(),
    capCongTrinh: number().nullable(),
    ghiChu: string().trim().nullable(),
    donViNhanDcId: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    hinhThucThanhLy: number().nullable(),
    thuTuGiam: number().nullable(),
    chiPhiGiam: number().nullable(),
    ngayBienDong: date().nullable(),
    lyDoBienDong: number().nullable(),
    trangThaiBienDong: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    loaiDieuChinhThongTin: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    loaiBienDong: number().nullable(),
    loaiTaiSanGoc: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
    thuTuBienDong: number().nullable().integer('Bạn phải nhập kiểu số nguyên'),
  });    
  const [state,dispatch] = useReducer(formReducer,INITIAL_STATE_FORM);
  const { data, error, isLoading, mutate } = hiNhaServices.GetById(id!);
  const { data:dataTaiSans }=hiNhaServices.GetTaiSan()
const { data:dataDonVis }=hiNhaServices.GetDonVi()
const { data:dataPhongBanChiuPhis }=hiNhaServices.GetPhongBanChiuPhi()
const { data:dataPhongBanQuanLys }=hiNhaServices.GetPhongBanQuanLy()
const { data:dataMaDiaBans }=hiNhaServices.GetMaDiaBan()
const { data:dataMaMucDichs }=hiNhaServices.GetMaMucDich()
const { data:dataMaNguonGocs }=hiNhaServices.GetMaNguonGoc()
const { data:dataTrangThaiSuDungs }=hiNhaServices.GetTrangThaiSuDung()
const { data:dataTinhTrangPasxs }=hiNhaServices.GetTinhTrangPasx()
const { data:dataPasxDuocDuyets }=hiNhaServices.GetPasxDuocDuyet()
const { data:dataCapCongTrinhs }=hiNhaServices.GetCapCongTrinh()
const { data:dataHinhThucThanhLys }=hiNhaServices.GetHinhThucThanhLy()
const { data:dataLyDoBienDongs }=hiNhaServices.GetLyDoBienDong()
const { data:dataLoaiBienDongs }=hiNhaServices.GetLoaiBienDong()
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: any) => {
    setLoading(true);
    if (id) {
      try {
        await hiNhaServices.update(id, values);
        toast.success("Cập nhật thành công");
        await mutate();
        await onClose(true);
      } catch (err: any) {
        toast.error("Cập nhật không thành công");
      }
    } else {
      try {
        await hiNhaServices.create(values);
        toast.success("Thêm thành công");
        await mutate();
        await onClose(true);
      } catch (err: any) {
        toast.error("Thêm mới không thành công");
      }
    }
    setLoading(false);
  };
   useEffect(() => {
    dispatch({type:action});
  }, [action, id]);
  return (
    <>
      <Modal show={show} size="xl" loading={loading}>
        <Formik
          onSubmit={(values) => {
            onSubmit(values);
          }}
          validationSchema={schema}
          initialValues={data ? data : dataDefault}
          enableReinitialize={true}
        >
          {({ handleSubmit}) => (
          <Form noValidate
          onSubmit={handleSubmit}
          onKeyPress={(ev) => {
            ev.stopPropagation();
          }}>
            <Modal.Header onClose={onClose}>{computedTitle(id,state?.editMode, titleTable)}</Modal.Header>
            <Modal.Body nameClass="grid-cols-12">
               <div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetSelect
	label='Mã tài sản id'
	required={true}
	view={state?.viewMode}
	id='taiSanId'
	name='taiSanId'
	options ={ dataTaiSans}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Mã/Tên chi nhánh quản lý'
	required={false}
	view={state?.viewMode}
	id='donViId'
	name='donViId'
	options ={ dataDonVis}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Mã/Tên chi nhánh quản lý'
	required={false}
	view={state?.viewMode}
	id='maDonVi'
	name='maDonVi'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Phòng ban chịu phí'
	required={false}
	view={state?.viewMode}
	id='phongBanChiuPhiId'
	name='phongBanChiuPhiId'
	options ={ dataPhongBanChiuPhis}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Phòng ban quản lý tài sản'
	required={false}
	view={state?.viewMode}
	id='phongBanQuanLyId'
	name='phongBanQuanLyId'
	options ={ dataPhongBanQuanLys}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số thẻ/Tên tài sản'
	required={false}
	view={state?.viewMode}
	id='soTheTaiSan'
	name='soTheTaiSan'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số thẻ/Tên tài sản'
	required={false}
	view={state?.viewMode}
	id='tenTaiSan'
	name='tenTaiSan'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Loại tài sản'
	required={false}
	view={state?.viewMode}
	type='number'
	id='loaiTaiSanId'
	name='loaiTaiSanId'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Mã/Tên nhóm tài sản'
	required={false}
	view={state?.viewMode}
	type='number'
	id='nhomTaiSanId'
	name='nhomTaiSanId'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Mã/Tên nhóm tài sản'
	required={false}
	view={state?.viewMode}
	id='maNhomTaiSan'
	name='maNhomTaiSan'
	/></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày nhập tài sản'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngayNhapThongTin'
	name='ngayNhapThongTin'
	/></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày đưa vào sử dụng'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngaySuDung'
	name='ngaySuDung'
	/></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày đưa vào sử dụng trước điều chỉnh'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngaySuDungTruoc'
	name='ngaySuDungTruoc'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Địa chỉ'
	required={false}
	view={state?.viewMode}
	id='maDiaBan'
	name='maDiaBan'
	options ={ dataMaDiaBans}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số nhà/ngõ xóm'
	required={false}
	view={state?.viewMode}
	id='diaChi'
	name='diaChi'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Mục đích sử dụng'
	required={false}
	view={state?.viewMode}
	id='maMucDich'
	name='maMucDich'
	options ={ dataMaMucDichs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Lý do tăng'
	required={false}
	view={state?.viewMode}
	id='maNguonGoc'
	name='maNguonGoc'
	options ={ dataMaNguonGocs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Trạng thái sử dụng'
	required={false}
	view={state?.viewMode}
	id='trangThaiSuDung'
	name='trangThaiSuDung'
	options ={ dataTrangThaiSuDungs}
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetInput
	label='Thời gian khấu hao'
	required={false}
	view={state?.viewMode}
	type='number'
	id='thoiGianKhauHao'
	name='thoiGianKhauHao'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Thời gian khâu hao tăng giảm'
	required={false}
	view={state?.viewMode}
	type='number'
	id='thoiGianKhauHaoTG'
	name='thoiGianKhauHaoTG'
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetInput
	label='Số tầng'
	required={false}
	view={state?.viewMode}
	type='number'
	id='soTang'
	name='soTang'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Số tầng tăng giảm'
	required={false}
	view={state?.viewMode}
	type='number'
	id='soTangTG'
	name='soTangTG'
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetSelect
	label='Tình trạng phê duyệt PASX'
	required={false}
	view={state?.viewMode}
	id='tinhTrangPasx'
	name='tinhTrangPasx'
	options ={ dataTinhTrangPasxs}
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='PASX được phê duyệt'
	required={false}
	view={state?.viewMode}
	id='pasxDuocDuyet'
	name='pasxDuocDuyet'
	options ={ dataPasxDuocDuyets}
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetSelect
	label='Cấp công trình'
	required={false}
	view={state?.viewMode}
	id='capCongTrinh'
	name='capCongTrinh'
	options ={ dataCapCongTrinhs}
	/></div>
<div className='col-span-6'>
	<TanetTextArea
	label='Ghi chú'
	required={false}
	view={state?.viewMode}
	rows={3}
	id='ghiChu'
	name='ghiChu'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Đơn vị nhận điều chuyển'
	required={false}
	view={state?.viewMode}
	type='number'
	id='donViNhanDcId'
	name='donViNhanDcId'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Hình thức thanh lý'
	required={false}
	view={state?.viewMode}
	id='hinhThucThanhLy'
	name='hinhThucThanhLy'
	options ={ dataHinhThucThanhLys}
	/></div>
<div className='col-span-6'></div>
<div className='col-span-6'></div>
<div className='col-span-6'>
	<TanetFormDate
	label='Ngày biến động'
	required={false}
	view={state?.viewMode}
	dateFormat='dd/MM/yyyy'
	id='ngayBienDong'
	name='ngayBienDong'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Lý do điều chỉnh'
	required={false}
	view={state?.viewMode}
	id='lyDoBienDong'
	name='lyDoBienDong'
	options ={ dataLyDoBienDongs}
	/></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laDcNguyenGia'
	name='laDcNguyenGia'
	>Điều chỉnh nguyên giá</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laDcNgayDuaVaoSd'
	name='laDcNgayDuaVaoSd'
	>Điều chỉnh ngày đưa vào sử dụng</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laDcKhauHao'
	name='laDcKhauHao'
	>Điều chỉnh khấu hao</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laDcThoiGianKh'
	name='laDcThoiGianKh'
	>Điều chỉnh thời gian khấu hao</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laDCNhomTaiSan'
	name='laDCNhomTaiSan'
	>Điều chỉnh nhóm tài sản</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laThayDoiThongTin'
	name='laThayDoiThongTin'
	>Thay đổi thông tin</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetInput
	label='Trạng thái biến động'
	required={false}
	view={state?.viewMode}
	type='number'
	id='trangThaiBienDong'
	name='trangThaiBienDong'
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Loại điều chỉnh thông tin'
	required={false}
	view={state?.viewMode}
	type='number'
	id='loaiDieuChinhThongTin'
	name='loaiDieuChinhThongTin'
	/></div>
<div className='col-span-6'>
	<TanetSelect
	label='Loại biến động'
	required={false}
	view={state?.viewMode}
	id='loaiBienDong'
	name='loaiBienDong'
	options ={ dataLoaiBienDongs}
	/></div>
<div className='col-span-6'>
	<TanetInput
	label='Loại tài sản gốc'
	required={false}
	view={state?.viewMode}
	type='number'
	id='loaiTaiSanGoc'
	name='loaiTaiSanGoc'
	/></div>
<div className='col-span-6'>
	<TanetCheckbox
	view={state?.viewMode}
	id='laBienDongCuoi'
	name='laBienDongCuoi'
	>Là biến động cuối</TanetCheckbox></div>
<div className='col-span-6'>
	<TanetInput
	label='Thứ tự biến động'
	required={false}
	view={state?.viewMode}
	type='number'
	id='thuTuBienDong'
	name='thuTuBienDong'
	/></div>
            </Modal.Body>
            <Modal.Footer onClose={onClose}>
              {!state?.viewMode ? (
                <>
                  <button
                    data-modal-hide="large-modal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Lưu
                  </button>
                </>
              ) : (
                <></>
              )}
            </Modal.Footer>
          </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

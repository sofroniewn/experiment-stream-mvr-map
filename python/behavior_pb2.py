# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: behavior.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='behavior.proto',
  package='behavior',
  syntax='proto2',
  serialized_pb=_b('\n\x0e\x62\x65havior.proto\x12\x08\x62\x65havior\"\xda\x02\n\x04\x44\x61ta\x12\x17\n\x0fpositionForward\x18\x01 \x02(\x02\x12\x17\n\x0fpositionLateral\x18\x02 \x02(\x02\x12\x17\n\x0fvelocityForward\x18\x03 \x02(\x02\x12\x17\n\x0fvelocityLateral\x18\x04 \x02(\x02\x12\x10\n\x08wallLeft\x18\x05 \x02(\x02\x12\x11\n\twallRight\x18\x06 \x02(\x02\x12\x13\n\x0bwallForward\x18\x07 \x02(\x02\x12\x10\n\x08response\x18\x08 \x02(\x08\x12\x0e\n\x06reward\x18\t \x02(\x08\x12\r\n\x05trial\x18\n \x02(\r\x12\x0c\n\x04link\x18\x0b \x02(\x08\x12\x11\n\tcollision\x18\x0c \x02(\x08\x12\x0f\n\x07\x61\x64vance\x18\r \x02(\x08\x12\r\n\x05\x64\x65lta\x18\x0e \x02(\x02\x12\x0c\n\x04time\x18\x0f \x02(\x02\x12\x0c\n\x04\x64\x61te\x18\x10 \x02(\r\x12\x16\n\x0e\x65xternalReward\x18\x11 \x02(\x08\x12\x0e\n\x06target\x18\x12 \x02(\x08')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_DATA = _descriptor.Descriptor(
  name='Data',
  full_name='behavior.Data',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='positionForward', full_name='behavior.Data.positionForward', index=0,
      number=1, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='positionLateral', full_name='behavior.Data.positionLateral', index=1,
      number=2, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='velocityForward', full_name='behavior.Data.velocityForward', index=2,
      number=3, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='velocityLateral', full_name='behavior.Data.velocityLateral', index=3,
      number=4, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='wallLeft', full_name='behavior.Data.wallLeft', index=4,
      number=5, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='wallRight', full_name='behavior.Data.wallRight', index=5,
      number=6, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='wallForward', full_name='behavior.Data.wallForward', index=6,
      number=7, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='response', full_name='behavior.Data.response', index=7,
      number=8, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='reward', full_name='behavior.Data.reward', index=8,
      number=9, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='trial', full_name='behavior.Data.trial', index=9,
      number=10, type=13, cpp_type=3, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='link', full_name='behavior.Data.link', index=10,
      number=11, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='collision', full_name='behavior.Data.collision', index=11,
      number=12, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='advance', full_name='behavior.Data.advance', index=12,
      number=13, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='delta', full_name='behavior.Data.delta', index=13,
      number=14, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='time', full_name='behavior.Data.time', index=14,
      number=15, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='date', full_name='behavior.Data.date', index=15,
      number=16, type=13, cpp_type=3, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='externalReward', full_name='behavior.Data.externalReward', index=16,
      number=17, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='target', full_name='behavior.Data.target', index=17,
      number=18, type=8, cpp_type=7, label=2,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=29,
  serialized_end=375,
)

DESCRIPTOR.message_types_by_name['Data'] = _DATA

Data = _reflection.GeneratedProtocolMessageType('Data', (_message.Message,), dict(
  DESCRIPTOR = _DATA,
  __module__ = 'behavior_pb2'
  # @@protoc_insertion_point(class_scope:behavior.Data)
  ))
_sym_db.RegisterMessage(Data)


# @@protoc_insertion_point(module_scope)
